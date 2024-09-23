export const filterTypedefs = `

    type FilteredTechnicianResponse {
        success: Boolean!
        message: String!
        technicians: [Technician!]!
        pageInfo: PageInfo!
    }

    type FilteredTechniciansByCompanyResponse {
        success: Boolean!
        message: String!
        technicians: [Technician!]!
    }

    type FilteredTechniciansByProfessionResponse {
        success: Boolean!
        message: String!
        technicians: [Technician!]!
    }

    type Query {
        searchLocations(query: String!): [Location]!
        filterTechniciansByLocation(locations: [LocationInput!]!): [Technician!]!
        getFilteredTechnicians(page: Int pageSize: Int locations: [LocationInput!] profession: String company: String): FilteredTechnicianResponse!
        filterTechniciansByCompany(companyName: String!): FilteredTechniciansByCompanyResponse!
        filterTechniciansByProfession(profession: String!): FilteredTechniciansByProfessionResponse!
    }
`;
