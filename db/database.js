// database.js
import { sequelize } from "./models/technicianModel.js"; // Import sequelize from one model file
import { Technician } from "./models/technicianModel.js";
import { Company } from "./models/companyModel.js";

// Set up the one-to-many association
Company.hasMany(Technician, { foreignKey: "company" });
Technician.belongsTo(Company, { foreignKey: "company" });

// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database and tables created successfully.");
  })
  .catch((error) => {
    console.error("Error synchronizing the database:", error);
  });
