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
import ProfessionFilter from "./ProfessionFilter/ProfessionFilter";

function AdvanceFilterSearch({ onChange }) {
  const [openDropdown, setOpenDropdown] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedProfession, setSelectedProfession] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");

  const handleDropdownToggle = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleLocationChange = (selectedOption) => {
    setSelectedLocation(selectedOption);
    console.log("s>>", selectedOption[0]);
    onChange({
      locations: selectedOption,
      profession: selectedProfession,
      company: selectedCompany,
    });
  };

  const handleProfessionChange = (selectedOption) => {
    setSelectedProfession(selectedOption);
    onChange({
      locations: selectedLocation,
      profession: selectedOption,
      company: selectedCompany,
    });
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
            onClick={() => handleDropdownToggle("location")}
          >
            Location
          </DropdownItem>
          <DropdownItem
            aria-label="items"
            onClick={() => handleDropdownToggle("profession")}
          >
            Profession
          </DropdownItem>
          <DropdownItem>Company</DropdownItem>
        </DropdownMenu>
      </Dropdown>
      {openDropdown === "location" && (
        <div className="mt-1">
          <LocationFilter onSelect={handleLocationChange} />
        </div>
      )}
      {openDropdown === "profession" && (
        <div className="mt-1">
          <ProfessionFilter onSelect={handleProfessionChange} />
        </div>
      )}
    </div>
  );
}

export default AdvanceFilterSearch;
