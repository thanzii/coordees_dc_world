import { GraphQLScalarType } from "graphql";
import { db } from "../db/connection.js";
import { Technician } from "../db/models/technicianModel.js";
import nodemailer from "nodemailer";
import { Company } from "../db/models/companyModel.js";

export const technicianResolvers = {
  Date: {
    Date: new GraphQLScalarType({
      name: "Date",
      description: "Date custom scalar type",
      parseValue: (value) => new Date(value),
      serialize: (value) => new Date(value),
      parseLiteral: (value) => {
        if (value.kind === "StringValue") {
          return new Date(value.value);
        }
        return null;
      },
    }),
  },
  Query: {
    getTechnician: async (_, { id }) => {
      return Technician.findByPk(id);
    },

    getTechnicians: async (_, args) => {
      try {
        const { page = 1, pageSize = 9 } = args;
        const offset = (page - 1) * pageSize;
        const technicians = await Technician.findAll({
          offset,
          limit: pageSize,
        });

        const totalTechnicians = await Technician.count();
        return {
          success: true,
          message: "Technicians retrieved successfully",
          technicians: technicians,
          pageInfo: {
            page,
            pageSize,
            total: totalTechnicians,
          },
        };
      } catch (error) {
        return {
          success: false,
          message: "Failed to retrieve technicians",
          technicians: [],
          pageInfo: {
            page: 1,
            pageSize: 7,
            total: 0,
          },
        };
      }
    },

    getCompanies: async () => {
      return Company.findAll();
    },
  },

  Mutation: {
    createCompany: async (_, { input }) => {
      const newCompany = Company.create(input);
      return newCompany;
    },
    createTechnician: async (_, input) => {
      let connection;
      try {
        connection = await db.getConnection();
        if (!connection) {
          throw new Error("Database connection is undefined.");
        }

        const { technicianInput } = input;
        if (!technicianInput || typeof technicianInput !== "object") {
          throw new Error(
            "Invalid input. Technician data is missing or not an object."
          );
        }

        const { company, ...technicianData } = technicianInput;
        connection.beginTransaction();

        let companyId;
        let companyName;
        if (company && company.name) {
          const [existingCompany] = await connection.execute(
            "SELECT * FROM Companies WHERE name = ?",
            [company.name]
          );

          if (existingCompany.length > 0) {
            companyId = existingCompany[0].id;
            companyName = existingCompany[0].name;
          } else {
            const [companyResult] = await connection.execute(
              "INSERT INTO Companies (name) VALUES (?)",
              [company.name]
            );
            companyId = companyResult.insertId || companyResult.lastID;
            companyName = company.name;
          }
        } else {
          companyId = null;
        }

        const [result] = await connection.execute(
          "INSERT INTO Technicians (firstName, lastName, phoneWhatsapp, phone, email, dateOfBirth, eId, eIdFile, company, companyLicenseNo, companyLicenseFile, profession, supportFile, hasDrivingLicense, drivingLicenseNo, drivingLicenseFile, location, approvalStatus, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())",
          [
            technicianData.firstName,
            technicianData.lastName,
            technicianData.phoneWhatsapp,
            technicianData.phone,
            technicianData.email,
            technicianData.dateOfBirth,
            technicianData.eId,
            technicianData.eIdFile,
            JSON.stringify(company),
            technicianData.companyLicenseNo,
            technicianData.companyLicenseFile,
            technicianData.profession || "cctvTechnician",
            technicianData.supportFile,
            technicianData.hasDrivingLicense,
            technicianData.drivingLicenseNo,
            technicianData.drivingLicenseFile,
            technicianData.location,
            technicianData.approvalStatus || "Waiting_for_approval",
          ]
        );
        await connection.commit();
        if (connection) {
          connection.release();
        }
        return {
          id: result.insertId,
          success: true,
          message: "Technician created successfully",
          company: {
            id: company.id,
            name: company.name,
          },
        };
      } catch (error) {
        if (connection) {
          connection.rollback();
          connection.release();
          return {
            success: false,
            message: error,
          };
        }
        console.error("Error connecting to the database:", error);
        throw error;
      }
    },

    updateTechnician: async (_, input) => {
      let connection;
      try {
        connection = await db.getConnection();
        if (!connection) {
          throw new Error("Database connection is undefined.");
        }
        const { company, ...updatedTechnicianData } = input;
        connection.beginTransaction();

        let companyId;
        if (
          updatedTechnicianData.company &&
          updatedTechnicianData.company.name
        ) {
          const [existingCompany] = await connection.execute(
            "SELECT * FROM Companies WHERE name = ?",
            [updatedTechnicianData.company.name]
          );

          if (existingCompany.length > 0) {
            companyId = existingCompany[0].id;
          } else {
            const [companyResult] = await connection.execute(
              "INSERT INTO Companies (name) VALUES (?)",
              [updatedTechnicianData.company.name]
            );
            companyId = companyResult.insertId || companyResult.lastID;
          }
        } else {
          companyId = null;
        }

        const [result] = await connection.execute(
          "UPDATE Technicians SET firstName = ?, lastName = ?, phoneWhatsapp = ?, phone = ?, email = ?, dateOfBirth = ?, eId = ?, eIdFile = ?, company = ?, companyLicenseNo = ?, companyLicenseFile = ?, profession = ?, supportFile = ?, hasDrivingLicense = ?, drivingLicenseNo = ?,  drivingLicenseFile = ?, location = ?, approvalStatus = ?  WHERE id = ?",
          [
            updatedTechnicianData.firstName,
            updatedTechnicianData.lastName,
            updatedTechnicianData.phoneWhatsapp,
            updatedTechnicianData.phone,
            updatedTechnicianData.email,
            updatedTechnicianData.dateOfBirth,
            updatedTechnicianData.eId,
            updatedTechnicianData.eIdFile,
            JSON.stringify(company),
            updatedTechnicianData.companyLicenseNo,
            updatedTechnicianData.companyLicenseFile,
            updatedTechnicianData.profession,
            updatedTechnicianData.supportFile,
            updatedTechnicianData.hasDrivingLicense,
            updatedTechnicianData.drivingLicenseNo,
            updatedTechnicianData.drivingLicenseFile,
            updatedTechnicianData.location,
            updatedTechnicianData.approvalStatus,
          ]
        );
        await connection.commit();
        if (connection) {
          connection.release();
        }
        return {
          id: result.id,
          updatedTechnicianData: updatedTechnicianData,
          company: {
            id: companyId,
            name:
              updatedTechnicianData.company &&
              updatedTechnicianData.company.name,
          },
        };
      } catch (error) {
        if (connection) {
          connection.rollback();
          connection.release();
        }
        console.error("Error connecting to the database:", error);
        throw error;
      }
    },

    deleteTechnician: async (_, { input: { id } }) => {
      let connection;
      try {
        connection = await db.getConnection();
        await connection.beginTransaction();
        if (id !== undefined) {
          await connection.execute("DELETE FROM Technicians WHERE id = ?", [
            id,
          ]);
        } else {
          throw new Error("ID is undefined");
        }
        await connection.commit();
        return { id };
      } catch (error) {
        await connection.rollback();
        throw error;
      } finally {
        connection.release();
      }
    },

    handleApproval: async (_, { technicianId, status }) => {
      const technician = await Technician.findByPk(technicianId);

      if (!technician) {
        return {
          success: false,
          message: "Technician not found",
          status: status,
        };
      }

      if (
        status !== "Approved" &&
        status !== "Rejected" &&
        status !== "Waiting_for_approval"
      ) {
        return {
          success: false,
          message: "Invalid approval status",
          status: status,
        };
      }
      technician.approvalStatus = status;
      await technician.save();

      return {
        success: true,
        message: `Approval status for technician ${technicianId} updated to ${status}`,
        status: status,
      };
    },

    sendApprovalMail: async (_, { technicianId, status }, { io }) => {
      const technician = await Technician.findByPk(technicianId);

      if (!technician) {
        return {
          success: false,
          message: "Technician not found",
          status: status,
        };
      }

      if (status !== "Approved" && status !== "Rejected") {
        return {
          success: false,
          message: "Invalid approval status for sending approval mail",
          status: status,
        };
      }

      const toEmail = technician.email;
      const subject =
        status === "Approved" ? "Coordees Approval" : "Coordees Rejection";
      const text =
        status === "Approved"
          ? "Congratulations! Your registration has been approved."
          : "We regret to inform you that your registration has been rejected.";

      const transporter = nodemailer.createTransport({
        host: "mail.coordees.com",
        port: 465,
        secure: true,
        auth: {
          user: "project@coordees.com",
          pass: "kHlyyWinp8l%",
        },
      });

      const mailOptions = {
        from: "project@coordees.com",
        to: toEmail,
        subject: subject,
        text: text,
      };

      await transporter.sendMail(mailOptions);

      io.emit("approvalEmailSent", { technicianId });
      return {
        success: status === "Approved" ? true : false,
        message:
          status === "Approved"
            ? "Approval email sent successfully"
            : "Rejection mail sent successfully",
        status: status,
      };
    },
  },
};
