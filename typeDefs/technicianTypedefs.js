export const technicianTypedefs = `
    scalar Date

    type Company {
      id: ID
      name: String
    }

    input CompanyInput {
      id: ID
      name: String
    }

    type Location {
      lat: Float
      lon: Float
      display_name: String
    }

    input LocationInput {
      lat: Float
      lon: Float
      display_name: String
     }

    enum Profession {
      cctvTechnician
      electrician
      plumber
    }

    input TechnicianInput {
        id: ID
        company: CompanyInput
        firstName: String
        lastName: String!
        phoneWhatsapp: String
        phone: String
        email: String
        dateOfBirth: Date
        eId: String
        eIdFile: [FileInput]
        companyLicenseNo: String
        companyLicenseFile: [FileInput]
        profession: Profession
        supportFile: FileInput
        hasDrivingLicense: Boolean
        drivingLicenseNo: String
        drivingLicenseFile: [FileInput]
        location: [LocationInput]
        approvalStatus: ApprovalStatus
      }

    type Technician {
        id: ID!
        company: Company
        firstName: String
        lastName: String
        phoneWhatsapp: String
        phone: String
        email: String
        dateOfBirth: Date
        eId: String
        eIdFile: [File]
        companyLicenseNo: String
        companyLicenseFile: [File]
        profession: Profession
        supportFile: File
        hasDrivingLicense: Boolean
        drivingLicenseNo: String
        drivingLicenseFile: [File]
        location: [Location]
        approvalStatus: ApprovalStatus
    }

    input UpdateTechnicianInput {
        id: ID!
        company: [CompanyInput]
        firstName: String
        lastName: String
        phoneWhatsapp: String
        phone: String
        email: String
        dateOfBirth: Date
        eId: String
        eIdFile: FileInput
        companyLicenseNo: String
        companyLicenseFile: FileInput
        profession: Profession
        supportFile: FileInput
        hasDrivingLicense: Boolean
        drivingLicenseNo: String
        drivingLicenseFile: FileInput
        location: [LocationInput]
        approvalStatus: ApprovalStatus
      }

      type TechnicianResponse {
        id: ID
        success: Boolean
        message: String
      }

      type UpdateTechnicianResponse {
        id: ID
        success: Boolean
        message: String
      }

      type PageInfo {
        page: Int!
        pageSize: Int!
        total: Int!
      }

      type TechnicianResponseList {
        success: Boolean
        message: String
        technicians: [Technician]
        pageInfo: PageInfo!
    }

      type UpdateTechnician {
        id: ID
        company: [Company]
        firstName: String
        lastName: String
        phoneWhatsapp: String
        phone: String
        email: String
        dateOfBirth: Date
        eId: String
        eIdFile: File
        companyLicenseNo: String
        companyLicenseFile: File
        profession: Profession
        supportFile: File
        hasDrivingLicense: Boolean
        drivingLicenseNo: String
        drivingLicenseFile: File
        location: [Location]
        approvalStatus: ApprovalStatus
      }

      input DeleteTechnicianInput {
        id: ID!
      }
      
      type DeleteTechnicianResponse {
        id: ID
      }

      input FileInput {
        fileName: String
        mimeType: String
        content: String
    }

    type File {
        fileName: String
        mimeType: String
        content: String
    }
      
      type ApprovalResult {
        success: Boolean
        message: String
        status: ApprovalStatus
      }
      enum ApprovalStatus {
        Approved
        Rejected
        Waiting_for_approval
      }
      
    type Query {
        getTechnician(id: ID!): Technician
        getTechnicians(page: Int, pageSize: Int) : TechnicianResponseList
        getCompanies: [Company]
    }

    type Mutation {
        createCompany(input: CompanyInput) : Company
        createTechnician(technicianInput: TechnicianInput): TechnicianResponse
        updateTechnician(input: UpdateTechnicianInput!): UpdateTechnicianResponse
        deleteTechnician(input: DeleteTechnicianInput!): DeleteTechnicianResponse
        handleApproval(technicianId: ID!, status: ApprovalStatus!): ApprovalResult!
        sendApprovalMail(technicianId: ID! ,status: ApprovalStatus!): ApprovalResult!
    }
`;
