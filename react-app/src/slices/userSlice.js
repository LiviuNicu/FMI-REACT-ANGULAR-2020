import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/index";

//reducer
export const userSlice = createSlice({
  name: "user",
  initialState: {
    registerData: {},
    loginError: false,
    isLoggedIn: false,
  },
  reducers: {
    setRegisterData: (state, action) => {
      state.registerData = action.payload;
    },
    clearRegisterData: (state) => {
      state.registerData = {};
    },
    setLoginError: (state, action) => {
      state.loginError = action.payload;
    },
    setLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
  },
});

//actions

export const {
  setRegisterData,
  clearRegisterData,
  setLoginError,
  setLoggedIn,
} = userSlice.actions;

export const doRegister = (data) => async (dispatch) => {
  console.log("slice", data);
  try {
    const response = await api.post("user/register", data);
    console.log(response);
    if (response.status === 200) {
      dispatch(setRegisterData(response.data.doc));
    }
  } catch (e) {}
};
export const doLogin = (data) => async (dispatch) => {
  try {
    const response = await api.post("user/login", data);
    console.log(response);
    if (response.status === 200) {
      localStorage.setItem("token", response.data.token);
      dispatch(setLoggedIn(true));
      // daca trimiteti obiecte folostini JSON.stringify iar la localstorage.getItem folosti JSON.parse
    }
  } catch (e) {
    dispatch(setLoginError(true));
  }
};

//selectors
export const reqRegisterData = (state) => state.user.registerData;
export const reqLoginError = (state) => state.user.loginError;
export const reqLoggedIn = (state) => state.user.isLoggedIn;

export default userSlice.reducer;
