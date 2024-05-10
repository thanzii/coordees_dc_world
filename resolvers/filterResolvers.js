import { Technician } from "../db/models/technicianModel.js";
import { Op } from "sequelize";

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
          const technicianLat = technician.location[0].lat;
          const technicianLon = technician.location[0].lon;
          return selectedLocations.some((location) => {
            const locationLat = location.lat;
            const locationLon = location.lon;
            const distance = calculateDistance(
              technicianLat,
              technicianLon,
              locationLat,
              locationLon
            );
            return distance <= 5;
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
      { page = 1, pageSize = 7, locations }
    ) => {
      const offset = (page - 1) * pageSize;
      const selectedLocations = Array.isArray(locations)
        ? locations
        : [locations];
      try {
        const technicians = await Technician.findAll();
        const filteredTechnicians = technicians.filter((technician) => {
          const technicianLat = technician.location[0].lat;
          const technicianLon = technician.location[0].lon;
          return selectedLocations.some((location) => {
            const locationLat = location.lat;
            const locationLon = location.lon;
            const distance = calculateDistance(
              technicianLat,
              technicianLon,
              locationLat,
              locationLon
            );
            return distance <= 5;
          });
        });

        const totalFilteredTechnicians = filteredTechnicians.length;

        return {
          success: true,
          message: "Filtered technicians retrieved successfully",
          technicians: filteredTechnicians,
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
  },
};
