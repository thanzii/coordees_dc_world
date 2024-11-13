import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";
import Select from "react-select";
import AddCompanyModal from "./AddCompanyModal";
import { connect } from "react-redux";
import { useDisclosure } from "@nextui-org/react";
import { Controller } from "react-hook-form";

const GET_COMPANIES = gql`
  query GetCompanies {
    getCompanies {
      id
      name
      companyLicenseNo
      companyLicenseFile {
        fileName
        mimeType
        content
      }
    }
  }
`;

function Company({ control, setValue, errors }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [inputValue, setInputValue] = useState("");
  const { loading, error, data } = useQuery(GET_COMPANIES);

  const handleSelectChange = (selected) => {
    if (selected && selected.value === "add_new_company") {
      onOpen();
    } else {
      setValue("company", selected.value);
    }
  };

  const handleCompanyCreated = (newCompany) => {
    setValue("company", newCompany);
  };

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const existingOptions =
    data?.getCompanies.map((item) => ({
      value: item,
      label: item.name,
    })) || [];

  const options = [
    ...existingOptions,
    ...(inputValue &&
    !existingOptions.some(
      (option) => option.label.toLowerCase() === inputValue.toLowerCase()
    )
      ? [
          {
            value: "add_new_company",
            label: `No option, add '${inputValue}'?`,
          },
        ]
      : []),
  ];

  return (
    <div>
      <Controller
        name="company"
        control={control}
        rules={{ required: "This field is required" }}
        render={({ field }) => (
          <Select
            {...field}
            isClearable
            options={options}
            value={
              field?.value
                ? { label: field.value.name, value: field.value }
                : null
            }
            onChange={(selected) => {
              handleSelectChange(selected);
              // field.onChange(selected);
            }}
            onInputChange={(value) => setInputValue(value)}
            placeholder="Select a Company or Add a new company"
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

      <AddCompanyModal
        isOpen={isOpen}
        onClose={onClose}
        resetCompany={() => setValue("company", null)}
        onCompanyCreated={handleCompanyCreated}
        inputValue={inputValue}
      />
    </div>
  );
}

export default Company;
