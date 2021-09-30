import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    dashboardLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { dashboardLoading } = dashboardSlice.actions;
export default dashboardSlice.reducer;
