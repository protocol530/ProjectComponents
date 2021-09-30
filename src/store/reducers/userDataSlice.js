import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {
    name: "",
    authCheck: "",
  },
};

const userDataSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setProfile(state, action) {},
  },
});

export const { setProfile } = userDataSlice.actions;
export default userDataSlice.reducer;
