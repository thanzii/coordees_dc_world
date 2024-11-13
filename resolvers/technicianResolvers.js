import { GraphQLScalarType } from "graphql";
import { db } from "../db/connection.js";
import { Technician } from "../db/models/technicianModel.js";
import nodemailer from "nodemailer";
import { Company } from "../db/models/companyModel.js";
import { sequelize } from "../db/models/technicianModel.js";

export const technicianResolvers = {
  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    parseValue: (value) => new Date(value),
    serialize: (value) => {
      const date = typeof value === "string" ? new Date(value) : value;
      return date instanceof Date && !isNaN(date) ? date.toISOString() : null;
    },
    parseLiteral: (ast) => {
      if (ast.kind === "StringValue") {
        return new Date(ast.value);
      }
      return null;
    },
  }),

  Query: {
    getTechnician: async (_, { id }) => Technician.findByPk(id),

    getTechnicians: async (_, { page = 1, pageSize = 9 }) => {
      const offset = (page - 1) * pageSize;

      const technicians = await Technician.findAll({
        offset,
        limit: pageSize,
        include: [
          {
            model: Company,
            as: "Company",
            attributes: ["name", "companyLicenseNo", "companyLicenseFile"],
            required: true,
          },
        ],
        order: [[{ model: Company, as: "Company" }, "id", "ASC"]],
      });

      const totalTechnicians = await Technician.count();
      return {
        success: true,
        message: "Technicians retrieved successfully",
        technicians,
        pageInfo: {
          page,
          pageSize,
          total: totalTechnicians,
        },
      };
    },

    getCompanies: async () => Company.findAll(),
  },

  Mutation: {
    createCompany: async (_, { input }) => {
      const transaction = await sequelize.transaction();
      try {
        const { name, companyLicenseNo, companyLicenseFile } = input;

        if (!companyLicenseNo || !companyLicenseFile) {
          throw new Error(
            "Both company license number and license file must be provided."
          );
        }

        const existingCompany = await Company.findOne({
          where: { name },
          transaction,
        });
        if (existingCompany) {
          throw new Error("A company with this name already exists.");
        }

        const newCompany = await Company.create(input, { transaction });
        await transaction.commit();

        return {
          id: newCompany.id,
          name: newCompany.name,
          companyLicenseNo: newCompany.companyLicenseNo,
          companyLicenseFile: newCompany.companyLicenseFile,
          success: true,
          message: "Company created successfully",
        };
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    },

    createTechnician: async (_, { technicianInput }) => {
      const transaction = await sequelize.transaction();
      try {
        const { company, ...technicianData } = technicianInput;

        const newTechnician = await Technician.create(
          {
            ...technicianData,
            company,
            approvalStatus:
              technicianData.approvalStatus || "Waiting_for_approval",
          },
          { transaction }
        );

        await transaction.commit();
        return {
          id: newTechnician.id,
          success: true,
          message: "Technician created successfully",
        };
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    },

    updateTechnician: async (_, { id, technicianInput }) => {
      const transaction = await sequelize.transaction();
      try {
        const { companyId, ...updatedTechnicianData } = technicianInput;

        await Technician.update(
          { ...updatedTechnicianData, companyId },
          { where: { id }, transaction }
        );

        await transaction.commit();
        return {
          success: true,
          message: "Technician updated successfully",
        };
      } catch (error) {
        await transaction.rollback();
        throw error;
      }
    },

    deleteTechnician: async (_, { id }) => {
      await Technician.destroy({ where: { id } });
      return { success: true, message: "Technician deleted successfully" };
    },

    handleApproval: async (_, { technicianId, status }) => {
      const technician = await Technician.findByPk(technicianId);
      if (!technician) {
        return { success: false, message: "Technician not found" };
      }

      technician.approvalStatus = status;
      await technician.save();

      return { success: true, message: `Approval status updated to ${status}` };
    },

    sendApprovalMail: async (_, { technicianId, status }, { io }) => {
      const technician = await Technician.findByPk(technicianId);
      if (!technician) {
        return { success: false, message: "Technician not found" };
      }

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
        to: technician.email,
        subject: `Coordees ${status === "Approved" ? "Approval" : "Rejection"}`,
        text:
          status === "Approved"
            ? "Congratulations! Your registration has been approved."
            : "We regret to inform you that your registration has been rejected.",
      };

      try {
        await transporter.sendMail(mailOptions);
        io.emit("approvalEmailSent", { technicianId });
        return { success: true, message: `${status} email sent successfully` };
      } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, message: "Failed to send email" };
      }
    },
  },
};
