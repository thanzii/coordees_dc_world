import React, { useState } from "react";
import Select from "react-select";
import { FILTER_TECHNICIANS_BY_PROFESSION } from "../../../../db-service/admin";
import { useQuery } from "@apollo/client";

const professionOptions = [
  { value: "cctvTechnician", label: "CCTV Technician" },
  { value: "electrician", label: "Electrician" },
  { value: "plumber", label: "Plumber" },
];

function ProfessionFilter({ onSelect }) {
  const [selectedProfession, setSelectedProfession] = useState(null);
  // const { loading, error, data } = useQuery(FILTER_TECHNICIANS_BY_PROFESSION, {
  //   variables: {
  //     profession: selectedProfession ? selectedProfession?.value : "",
  //   },
  //   skip: !selectedProfession,
  // });

  const handleProfessionChange = (selectedOption) => {
    setSelectedProfession(selectedOption);
    onSelect(selectedOption?.value);
  };

  return (
    <div>
      <Select
        options={professionOptions}
        onChange={handleProfessionChange}
        placeholder="Select a profession"
      />
    </div>
  );
}

export default ProfessionFilter;
