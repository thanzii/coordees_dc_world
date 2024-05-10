import { login } from "../../db-service/auth";
const initialState = {
  token: null,
  user: null,
};

const userModel = {
  state: initialState,
  reducers: {
    setToken(state, payload) {
      return { ...state, token: payload };
    },
    setUser(state, payload) {
      return { ...state, user: payload };
    },
    resetModel() {
      return initialState;
    },
  },
  effects: (dispatch) => ({
    async login(payload, state) {
      const { accessToken, message, success } = await login({
        email: payload.email,
        password: payload.password,
      });

      if (success) {
        dispatch.userModel.setToken(accessToken);
        dispatch.userModel.setUser({ email: payload.email });
        const navigationPath =
          accessToken.userroles === "Admin"
            ? "/adminView"
            : accessToken.userroles === "Users"
            ? "/technicianForm"
            : "/";

        return navigationPath;
      }
    },
    async logout() {
      dispatch.userModel.resetModel();
      dispatch.mapModel.resetModel();
      dispatch.techniciansModel.resetModel();
    },
  }),
};

export default userModel;
