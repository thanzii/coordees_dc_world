import { gql, useMutation, useQuery } from "@apollo/client";
import React from "react";
import { connect } from "react-redux";
import Select from "react-select";

const CREATE_COMPANY = gql`
  mutation CreateCompany($input: CompanyInput!) {
    createCompany(input: $input) {
      id
      name
    }
  }
`;

const GET_COMPANIES = gql`
  query GetCompanies {
    getCompanies {
      id
      name
    }
  }
`;

function Company({ company, setCompany }) {
  const handleCreateCompany = async (newCompanyName) => {
    try {
      await createCompany({
        variables: {
          input: { name: newCompanyName },
        },
        refetchQueries: [{ query: GET_COMPANIES }],
      }).then(async (response) => {
        const {
          data: {
            createCompany: { id, name },
          },
        } = response;

        setCompany({ value: id, label: name });
      });
    } catch (error) {
      console.error("Error creating company:", error);
    }
  };

  const handleBlur = (e) => {
    const inputValue = e.target.value;

    if (inputValue.trim() !== "") {
      if (
        data?.getCompanies &&
        !data.getCompanies.some((option) => option.label === inputValue)
      ) {
        handleCreateCompany(inputValue);
      }
    }
  };

  const [createCompany] = useMutation(CREATE_COMPANY);
  const { loading, error, data } = useQuery(GET_COMPANIES);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const options =
    data?.getCompanies?.map((company) => ({
      value: company.id,
      label: company.name,
    })) || [];

  return (
    <div>
      <Select
        options={options}
        onBlur={handleBlur}
        value={company}
        onChange={(value) => setCompany(value)}
        placeholder="Search Company Name"
      />
    </div>
  );
}

const mapStateToProps = ({ techniciansModel: { company } }) => ({ company });

const mapDispatchToProps = ({ techniciansModel: { setCompany } }) => ({
  setCompany,
});

export default connect(mapStateToProps, mapDispatchToProps)(Company);
