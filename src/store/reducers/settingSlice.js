import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
};

const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    settingLoading(state, action) {
      state.isLoading = action.payload;
    },
  },
});

export const { settingLoading } = settingSlice.actions;
export default settingSlice.reducer;
