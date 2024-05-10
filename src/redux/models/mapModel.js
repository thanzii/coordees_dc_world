import axios from "axios";

const initialState = {
  locations: {},
  isLocationsLoading: false,
  selectedLocations: [],
};

const mapModel = {
  state: initialState,
  reducers: {
    setLocations(state, payload) {
      return { ...state, locations: payload };
    },
    setIsLocationsLoading(state, payload) {
      return { ...state, isLocationsLoading: payload };
    },
    setSelectedLocations(state, payload) {
      return { ...state, selectedLocation: payload };
    },
    resetModel() {
      return initialState;
    },
  },
  effects: (dispatch) => ({
    async getLocations(searchText, state) {
      dispatch.mapModel.setIsLocationsLoading(true);
      try {
        const apiUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchText
        )}`;

        const response = await axios.get(apiUrl);
        const results = response.data?.map((result) => ({
          label: result.display_name,
          value: {
            lat: result.lat,
            lon: result.lon,
            display_name: result.display_name,
          },
        }));

        dispatch.mapModel.setLocations(results);
        dispatch.mapModel.setIsLocationsLoading(false);
        return results;
      } catch (e) {}
    },
  }),
};

export default mapModel;
