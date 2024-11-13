import { gql } from "@apollo/client";

const GET_TECHNICIANS = gql`
  query getTechnicians($page: Int, $pageSize: Int) {
    getTechnicians(page: $page, pageSize: $pageSize) {
      success
      message
      technicians {
        id
        company
        Company {
          name
          companyLicenseNo
          companyLicenseFile {
            fileName
            mimeType
            content
          }
        }
        firstName
        lastName
        email
        phone
        phoneWhatsapp
        dateOfBirth
        eId
        eIdFile {
          fileName
          mimeType
          content
        }
        profession
        supportFile {
          fileName
          mimeType
          content
        }
        hasDrivingLicense
        drivingLicenseNo
        drivingLicenseFile {
          fileName
          mimeType
          content
        }
        approvalStatus
        location {
          lat
          lon
          display_name
        }
      }
      pageInfo {
        page
        pageSize
        total
      }
    }
  }
`;

const SEND_APPROVAL_MAIL = gql`
  mutation sendApprovalMail($technicianId: ID!, $status: ApprovalStatus!) {
    sendApprovalMail(technicianId: $technicianId, status: $status) {
      success
      message
      status
    }
  }
`;

const HANDLE_APPROVAL = gql`
  mutation handleApproval($technicianId: ID!, $status: ApprovalStatus!) {
    handleApproval(technicianId: $technicianId, status: $status) {
      success
      message
      status
    }
  }
`;

const DELETE_TECHNICIAN = gql`
  mutation deleteTechnician($input: DeleteTechnicianInput!) {
    deleteTechnician(input: $input) {
      id
    }
  }
`;

const FILTER_TECHNICIANS_BY_LOCATION = gql`
  query filterTechniciansByLocation($locations: [LocationInput!]!) {
    filterTechniciansByLocation(locations: $locations) {
      id
      firstName
      lastName
      email
      phoneWhatsapp
      location {
        lat
        lon
        display_name
      }
    }
  }
`;

const SEARCH_LOCATIONS = gql`
  query SearchLocations($query: String!) {
    searchLocations(query: $query) {
      display_name
      lat
      lon
    }
  }
`;

const FILTER_TECHNICIANS_BY_PROFESSION = gql`
  query filterTechniciansByProfession($profession: String!) {
    filterTechniciansByProfession(profession: $profession) {
      success
      message
      technicians {
        firstName
        lastName
        email
        phone
        phoneWhatsapp
        dateOfBirth
        profession
        company
        eId
        eIdFile {
          fileName
          mimeType
          content
        }
        drivingLicenseNo
        drivingLicenseFile {
          fileName
          mimeType
          content
        }
        location {
          lat
          lon
          display_name
        }
      }
    }
  }
`;

const GET_FILTERED_TECHNICIANS = gql`
  query GetFilteredTechnicians(
    $page: Int
    $pageSize: Int
    $locations: [LocationInput!]
    $profession: String
    $company: String
  ) {
    getFilteredTechnicians(
      page: $page
      pageSize: $pageSize
      locations: $locations
      profession: $profession
      company: $company
    ) {
      success
      message
      technicians {
        id
        company
        firstName
        lastName
        email
        phone
        phoneWhatsapp
        dateOfBirth
        eId
        eIdFile {
          fileName
          mimeType
          content
        }
        profession
        supportFile {
          fileName
          mimeType
          content
        }
        hasDrivingLicense
        drivingLicenseNo
        drivingLicenseFile {
          fileName
          mimeType
          content
        }
        approvalStatus
        location {
          lat
          lon
          display_name
        }
      }
      pageInfo {
        page
        pageSize
        total
      }
    }
  }
`;

export {
  GET_TECHNICIANS,
  SEND_APPROVAL_MAIL,
  HANDLE_APPROVAL,
  DELETE_TECHNICIAN,
  FILTER_TECHNICIANS_BY_LOCATION,
  SEARCH_LOCATIONS,
  GET_FILTERED_TECHNICIANS,
  FILTER_TECHNICIANS_BY_PROFESSION,
};
