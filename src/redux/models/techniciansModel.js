import {
  createTechnician,
  updateTechnician,
} from "../../db-service/technicianDbService";

const initialState = {
  company: null,
  selectedTechnician: null,
};

const techniciansModel = {
  state: initialState,
  reducers: {
    setCompany: (state, payload) => {
      return { ...state, company: payload };
    },
    setSelectedTechnician: (state, payload) => {
      return { ...state, selectedTechnician: payload };
    },
    resetModel: () => {
      return initialState;
    },
  },
  effects: (dispatch) => ({
    createOrUpdateTechnician: async (inputData, state) => {
      const {
        mapModel: { selectedLocation },
        techniciansModel: { company, selectedTechnician },
      } = state;
      inputData.location = Object.values(selectedLocation).map(
        ({ value: { lat, lon, display_name } }) => ({
          lat: parseFloat(lat),
          lon: parseFloat(lon),
          display_name,
        })
      );

      inputData.company = inputData.company.id;
      try {
        const result = selectedTechnician
          ? await updateTechnician(selectedTechnician.id, { input: inputData })
          : await createTechnician({ input: inputData });
        if (result && result.success) {
          console.log("Technician created/updated successfully:", result);
        } else {
          console.error("Error creating/updating technician:", result);
        }
      } catch (error) {
        console.error("Error creating/updating technician", error);
      }
    },
  }),
};

export default techniciansModel;
