import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  navToggle: false,
  errorType: null,
};

const commonSlice = createSlice({
  name: "commonSlice",
  initialState,
  reducers: {
    isToggle(state, action) {
      state.navToggle = !state.navToggle;
    },
    errorHandler(state, action) {
      state.errorType = action.payload;
    },
  },
});
export const { isToggle, errorHandler } = commonSlice.actions;
export default commonSlice.reducer;
