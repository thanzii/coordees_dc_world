import { DataTypes, Sequelize } from "sequelize";
import mysql2 from "mysql2";

const sequelize = new Sequelize("coordeesdc", "root", "Password", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  dialectModule: mysql2,
});

export const Company = sequelize.define(
  "Company",
  {
    id: {
      type: DataTypes.MEDIUMINT,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
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
    console.error("Error synchronising the database:", error);
  });
