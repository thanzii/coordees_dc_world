export const filterTypedefs = `

    type FilteredTechnicianResponse {
        success: Boolean!
        message: String!
        technicians: [Technician!]!
        pageInfo: PageInfo!
    }

    type Query {
        searchLocations(query: String!): [Location]!
        filterTechniciansByLocation(locations: [LocationInput!]!): [Technician!]!
        getFilteredTechnicians(page: Int pageSize: Int locations: [LocationInput!]!): FilteredTechnicianResponse!
    }
`;
