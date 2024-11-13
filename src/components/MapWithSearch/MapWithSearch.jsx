import LMap from "leaflet";
import "leaflet.locatecontrol";
import "leaflet.locatecontrol/dist/L.Control.Locate.css";
import "leaflet/dist/leaflet.css";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import AsyncSelect from "react-select/async";

import {
  handleInputChange,
  handleSelectLocation,
  setCurrentLocation,
} from "./helpers";
import { dispatch } from "../../redux/store";
import { Controller } from "react-hook-form";

const MapWithSearch = ({ isLocationsLoading, control }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {
    const initialLocation = [0, 0];
    const map = LMap.map("map").setView(initialLocation, 2);

    LMap.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      map
    );

    setMap(map);

    LMap.control
      .locate({
        setView: "always",
        enableHighAccuracy: true,
      })
      .addTo(map);

    setCurrentLocation({ map });

    return () => {
      map.remove();
    };
  }, []);

  const loadOptions = (inputValue, callback) => {
    setTimeout(async () => {
      const options = await dispatch.mapModel.getLocations(inputValue);
      callback(options);
    }, 1000);
  };

  return (
    <div>
      <div>
        <div className="bg-white border-1 rounded-xl mt-1">
          <div
            id="map"
            className="rounded-t-xl shadow-sm mb-3"
            style={{ width: "100%", height: "250px" }}
          ></div>
          <span className="text-xs pl-2">
            Location <span className="text-red-500 text-sm">*</span>
          </span>
          <Controller
            name="location"
            control={control}
            rules={{
              required: "This field is required",
            }}
            render={({ field }) => (
              <AsyncSelect
                {...field}
                isMulti
                isClearable
                isSearchable
                loadOptions={loadOptions}
                onChange={(location) => {
                  handleSelectLocation({ map, location });
                  field.onChange(location);
                }}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                placeholder="Search for a location"
                isLoading={isLocationsLoading}
                styles={{
                  control: (provided) => ({
                    ...provided,
                    border: "none",
                    borderRadius: "12px",
                    boxShadow: "none",
                  }),
                  menu: (provided) => ({
                    ...provided,
                    zIndex: 1000,
                  }),
                }}
              />
            )}
          />
        </div>
        {/* {errors?.company && (
          <span className="text-red-500 text-xs pl-1">
            {errors?.company.message}
          </span>
        )} */}
      </div>
    </div>
  );
};

const mapStateToProps = ({ mapModel: { isLocationsLoading } }) => ({
  isLocationsLoading,
});

export default connect(mapStateToProps)(MapWithSearch);
