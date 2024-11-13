// sequelize.js
import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

export const sequelize = new Sequelize("coordeesdc", "root", "Password", {
  host: "localhost",
  port: 3306,
  dialect: "mysql",
  dialectModule: mysql2,
});

sequelize
  .authenticate()
  .then(() => console.log("Database connected"))
  .catch((error) => console.error("Database connection error:", error));
