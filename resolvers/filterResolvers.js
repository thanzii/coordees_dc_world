import { Technician } from "../db/models/technicianModel.js";

// Helper function to calculate Haversine distance
function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return distance;
}

export const filterResolvers = {
  Query: {
    searchLocations: async (_, { query }) => {
      try {
        const technicians = Technician.findAll();

        const locations = (await technicians).reduce(
          (uniqueLocations, technician) => {
            technician.location.forEach((loc) => {
              if (
                loc.display_name.toLowerCase().includes(query.toLowerCase()) &&
                !uniqueLocations.some(
                  (l) => l.display_name === loc.display_name
                )
              ) {
                uniqueLocations.push(loc);
              }
            });
            return uniqueLocations;
          },
          []
        );

        return locations;
      } catch (error) {
        console.error("Error searching locations:", error);
        throw error;
      }
    },

    filterTechniciansByLocation: async (_, { locations }) => {
      // Convert locations to an array if it's not already
      const selectedLocations = Array.isArray(locations)
        ? locations
        : [locations];

      try {
        const technicians = await Technician.findAll();

        const filteredTechnicians = technicians.filter((technician) => {
          return technician.location.some((technicianLocation) => {
            return selectedLocations.some((selectedLocation) => {
              const distance = calculateDistance(
                technicianLocation.lat,
                technicianLocation.lon,
                selectedLocation.lat,
                selectedLocation.lon
              );
              return distance <= 5; // Adjust the radius as needed
            });
          });
        });

        return filteredTechnicians;
      } catch (error) {
        console.error("Error filtering technicians by location:", error);
        throw error;
      }
    },

    getFilteredTechnicians: async (
      _,
      { page = 1, pageSize = 7, locations, profession, companyName }
    ) => {
      const offset = (page - 1) * pageSize;
      const selectedLocations = locations
        ? Array.isArray(locations)
          ? locations
          : [locations]
        : null;
      let matchesLocation = true;
      let matchesProfession = true;
      let matchesCompany = true;
      try {
        const technicians = await Technician.findAll();

        const filteredTechnicians = technicians.filter((technician) => {
          if (selectedLocations && selectedLocations.length > 0) {
            matchesLocation = technician.location.some((technicianLocation) => {
              return selectedLocations.some((selectedLocation) => {
                const distance = calculateDistance(
                  technicianLocation.lat,
                  technicianLocation.lon,
                  selectedLocation?.lat,
                  selectedLocation?.lon
                );
                return distance <= 5; // Adjust the radius as needed
              });
            });
          }

          if (profession) {
            matchesProfession =
              technician.profession &&
              technician.profession.toLowerCase() === profession.toLowerCase();
          }

          if (companyName) {
            matchesCompany =
              technician.company &&
              technician.company.toLowerCase() === companyName.toLowerCase();
          }

          return matchesLocation && matchesProfession && matchesCompany;
        });

        const totalFilteredTechnicians = filteredTechnicians.length;
        console.log("fttt>>", filteredTechnicians);
        return {
          success: true,
          message: "Filtered technicians retrieved successfully",
          technicians: filteredTechnicians.slice(offset, offset + pageSize),
          pageInfo: {
            page,
            pageSize,
            total: totalFilteredTechnicians,
          },
        };
      } catch (error) {
        console.error("Error retrieving filtered technicians:", error);
        return {
          success: false,
          message: "Failed to retrieve filtered technicians",
          technicians: [],
          pageInfo: {
            page: 1,
            pageSize: 7,
            total: 0,
          },
        };
      }
    },

    filterTechniciansByCompany: async (_, { companyName }) => {
      try {
        const technicians = await Technician.findAll();
        const filteredTechnicians = technicians.filter((technician) => {
          return companyName
            ? technician.company &&
                technician.company.name.toLowerCase() ===
                  companyName.toLowerCase()
            : true;
        });

        return {
          success: true,
          message: "Filtered technicians by company retrieved successfully",
          technicians: filteredTechnicians,
        };
      } catch (error) {
        console.error("Error filtering technicians by company:", error);
        return {
          success: false,
          message: "Failed to retrieve technicians by company",
          technicians: [],
        };
      }
    },

    filterTechniciansByProfession: async (_, { profession }) => {
      try {
        const technicians = await Technician.findAll();
        const filteredTechnicians = technicians.filter((technician) => {
          return profession
            ? technician.profession &&
                technician.profession.toLowerCase() === profession.toLowerCase()
            : true;
        });

        return {
          success: true,
          message: "Filtered technicians by profession retrieved successfully",
          technicians: filteredTechnicians,
        };
      } catch (error) {
        console.error("Error filtering technicians by profession:", error);
        return {
          success: false,
          message: "Failed to retrieve technicians by profession",
          technicians: [],
        };
      }
    },
  },
};
