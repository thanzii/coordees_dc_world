import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import React, { useState } from "react";
import LocationFilter from "./LocationFilter/LocationFilter";
import ProfessionFilter from "./ProfessionFilter/ProfessionFilter";
import { MdFilterListAlt as FilterIcon } from "react-icons/md";

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
          <Button isIconOnly size="sm" variant="bordered">
            <FilterIcon size="1.3rem" color="#17C964" />
          </Button>
          {/* <Button
            variant="bordered"
            className=''
          >
            <img className="max-w-6" src={filter} alt="filter-icon" />
            <FilterIcon />
          </Button> */}
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
