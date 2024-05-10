import { debounce } from "lodash";
import { dispatch } from "../../redux/store";

const useDebouncedEffect = (effect, delay = 200) => debounce(effect, delay);

const handleSearch = async (text) => {
  if (text.trim() === "") {
    dispatch.mapModel.setLocations([]);
    return;
  }
  dispatch.mapModel.getLocations(text);
};

const debouncedSearchFunction = useDebouncedEffect(handleSearch);

const handleInputChange = (inputValue, action) => {
  if (action.action === "input-change") {
    debouncedSearchFunction(inputValue);
  }
};

const handleSelectLocation = ({ map, location }) => {
  dispatch.mapModel.setSelectedLocations({ ...location });
  if (location.length > 0) {
    const { lat, lon } = location[0].value;
    const parsedLat = parseFloat(lat);
    const parsedLon = parseFloat(lon);

    !isNaN(parsedLat) &&
      !isNaN(parsedLon) &&
      map.setView([parsedLat, parsedLon], 12);
  }
};

const setCurrentLocation = ({ map }) => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        map.setView([latitude, longitude], 12);

        dispatch.mapModel.setSelectedLocations([
          {
            lat: latitude,
            lon: longitude,
            display_name: "Current Location",
          },
        ]);
      },
      (error) => {
        console.error("Error getting current location:", error);
      }
    );
  }
};

export { handleInputChange, handleSelectLocation, setCurrentLocation };
