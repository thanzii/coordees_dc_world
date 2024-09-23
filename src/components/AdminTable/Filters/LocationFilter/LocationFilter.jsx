import { useQuery } from "@apollo/client";
import Select from "react-select";
import React, { useState } from "react";
import { SEARCH_LOCATIONS } from "../../../../db-service/admin";
import { debounce } from "lodash";

function LocationFilter({ onSelect }) {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [debouncedQuery, setDebouncedQuery] = useState("");

  const { loading: searchLoading, data: searchData } = useQuery(
    SEARCH_LOCATIONS,
    {
      variables: { query: debouncedQuery },
      skip: debouncedQuery === "",
    }
  );

  const debouncedHandleSearchChange = debounce((query) => {
    setDebouncedQuery(query);
  }, 500);

  const handleSearchChange = (query) => {
    debouncedHandleSearchChange(query);
  };

  const options =
    searchData?.searchLocations?.map((location) => ({
      value: {
        lat: location.lat,
        lon: location.lon,
        display_name: location.display_name,
      },
      label: location.display_name,
    })) || [];

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption?.value);
    onSelect([selectedOption?.value]);
    console.log("sosososososo", selectedOption?.value);
  };

  console.log("slslslsl222", selectedLocation);

  return (
    <div>
      <Select
        value={selectedLocation}
        onChange={handleLocationChange}
        options={options}
        isLoading={searchLoading}
        onInputChange={handleSearchChange}
        placeholder="Select a location..."
        isClearable
        isSearchable
      />
    </div>
  );
}

export default LocationFilter;
