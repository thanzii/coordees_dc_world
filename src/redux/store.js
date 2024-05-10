import { init } from "@rematch/core";
import createLoadingPlugin from "@rematch/loading";
import models from "./models";
import createRematchPersist from "@rematch/persist";
import storage from "redux-persist/lib/storage";

const loadingPlugin = createLoadingPlugin();

const persistPlugin = createRematchPersist({
  whitelist: ["userModel", "mapModel", "techniciansModel"],
  key: "primary",
  storage,
});

const store = init({
  models,
  plugins: [loadingPlugin, persistPlugin],
});

const { dispatch, getState } = store;

export { dispatch, getState };
export default store;
