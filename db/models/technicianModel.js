import { DataTypes, Sequelize } from "sequelize";
import mysql2 from "mysql2";

const sequelize = new Sequelize("coordeesdc", "root", "Password", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  dialectModule: mysql2,
});

export const Technician = sequelize.define(
  "Technician",
  {
    id: {
      type: DataTypes.MEDIUMINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    phoneWhatsapp: {
      type: DataTypes.STRING,
    },
    phone: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.DATEONLY,
    },
    eId: {
      type: DataTypes.STRING,
    },
    eIdFile: {
      type: DataTypes.JSON,
    },
    companyLicenseNo: {
      type: DataTypes.STRING,
    },
    companyLicenseFile: {
      type: DataTypes.JSON,
    },
    company: {
      type: DataTypes.JSON,
    },
    profession: {
      type: DataTypes.ENUM("cctvTechnician", "electrician", "plumber"),
      defaultValue: "cctvTechnician",
    },
    supportFile: {
      type: DataTypes.JSON,
    },
    hasDrivingLicense: {
      type: DataTypes.BOOLEAN,
    },
    drivingLicenseNo: {
      type: DataTypes.STRING,
    },
    drivingLicenseFile: {
      type: DataTypes.JSON,
    },
    location: {
      type: DataTypes.JSON,
    },
    approvalStatus: {
      type: DataTypes.ENUM("Approved", "Rejected", "Waiting_for_approval"),
      defaultValue: "Waiting_for_approval",
    },
  },
  { timestamps: true }
);

sequelize
  .sync()
  .then(() => {
    console.log("Database and table created");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });