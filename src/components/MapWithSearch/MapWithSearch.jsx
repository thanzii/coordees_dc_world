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

const MapWithSearch = ({
  isLocationsLoading,
  locations,
  selectedLocations,
}) => {
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
        <div
          id="map"
          className="rounded-md shadow-md my-3"
          style={{ width: "100%", height: "250px" }}
        ></div>
        <AsyncSelect
          isMulti
          isClearable
          isSearchable
          loadOptions={loadOptions}
          onChange={(location) => handleSelectLocation({ map, location })}
          getOptionLabel={(option) => option.label}
          getOptionValue={(option) => option.value}
          placeholder="Search for a location"
          isLoading={isLocationsLoading}
        />
      </div>
    </div>
  );
};

const mapStateToProps = ({
  mapModel: { isLocationsLoading, locations, selectedLocations },
}) => ({
  isLocationsLoading,
  locations,
  selectedLocations,
});

export default connect(mapStateToProps)(MapWithSearch);
