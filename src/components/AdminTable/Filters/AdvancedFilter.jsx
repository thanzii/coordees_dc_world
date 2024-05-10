import React, { useState } from "react";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import filter from "../../../assets/filter.svg";
import LocationFilter from "./LocationFilter/LocationFilter";

function AdvanceFilterSearch({ onChange }) {
  const [isLocationDropdown, setIsLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  const handleLocationDropdownToggle = () => {
    setIsLocationDropdown(!isLocationDropdown);
  };

  const handleLocationChange = (selectedOption) => {
    console.log("slllll2", selectedOption);
    setSelectedLocation(selectedOption);
    onChange(selectedOption?.value);
  };

  return (
    <div>
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
            className="bg-gradient-to-tr from-green-50 via-green-100 to-green-200 hover:bg-gradient-to-bl hover:from-green-200 hover:via-green-100 hover:to-green-50"
          >
            <img className="max-w-6" src={filter} alt="filter-icon" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="menus">
          <DropdownItem
            aria-label="items"
            onClick={handleLocationDropdownToggle}
          >
            Location
          </DropdownItem>
          <DropdownItem>Profession</DropdownItem>
          <DropdownItem>Company</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {isLocationDropdown && (
        <div className="my-4">
          <LocationFilter onSelect={handleLocationChange} />
        </div>
      )}
    </div>
  );
}

export default AdvanceFilterSearch;
