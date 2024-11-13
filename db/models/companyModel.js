// models/companyModel.js
import { DataTypes } from "sequelize";
import { sequelize } from "./technicianModel.js"; // Reuse the sequelize instance

// Define the Company model
export const Company = sequelize.define(
  "Company",
  {
    id: {
      type: DataTypes.MEDIUMINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING },
    companyLicenseNo: { type: DataTypes.STRING },
    companyLicenseFile: { type: DataTypes.JSON },
  },
  { timestamps: true }
);
