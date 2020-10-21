import { createSlice } from "@reduxjs/toolkit";
import { api } from "../api/index";

//reducer
export const userSlice = createSlice({
  name: "user",
  initialState: {
    registerData: {},
  },
  reducers: {
    setRegisterData: (state, action) => {
      state.registerData = action.payload;
    },
    clearRegisterData: (state) => {
      state.registerData = {};
    },
  },
});

//actions

export const { setRegisterData, clearRegisterData } = userSlice.actions;

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

//selectors
export const reqRegisterData = (state) => state.user.registerData;

export default userSlice.reducer;
