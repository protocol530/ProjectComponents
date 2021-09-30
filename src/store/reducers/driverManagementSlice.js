import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  filterCondition: {
    status: null,
    modelType: null,
    option: null,
  },
  clickTableRow: null,
  modifyTarget: null,
};

const driverManagementSlice = createSlice({
  name: "driverManagement",
  initialState,
  reducers: {
    driverManagementLoading(state, action) {
      state.isLoading = action.payload;
    },
    driverManagementFilter(state, action) {},
    driverManagementClickRow(state, action) {
      const { row } = action.payload;
      state.clickTableRow = row;
    },
    driverManagementModifyTarget(state, action) {
      const { target } = action.payload;
      state.modifyTarget = target;
    },
    driverManagementClickRowSetInit(state) {
      // console.log("clear");
      state.clickTableRow = initialState.clickTableRow;
    },
  },
});

export const {
  driverManagementLoading,
  driverManagementFilter,
  driverManagementClickRow,
  driverManagementModifyTarget,
  driverManagementClickRowSetInit,
} = driverManagementSlice.actions;
export default driverManagementSlice.reducer;
