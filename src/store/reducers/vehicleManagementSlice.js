import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  filterCondition: {
    status: null,
    modelType: null,
    option: null,
  },
  clickTableRow: null,
  detail: null,
  surchargeRow: null,
};

const vehicleManagementSlice = createSlice({
  name: "vehicleManagement",
  initialState,
  reducers: {
    vehicleManagementLoading(state, action) {
      state.isLoading = action.payload;
    },
    vehicleManagementFilter(state, action) {},
    vehicleManagementClickRow(state, action) {
      const { row } = action.payload;
      state.clickTableRow = row;
    },
    vehicleManagementDetail(state, action) {
      state.detail = action.payload;
    },
    vehicleManagementClickRowSetInit(state) {
      state.clickTableRow = initialState.clickTableRow;
    },
    vehicleManagementSurchargeRow(state, action) {
      state.surchargeRow = action.payload;
    },
  },
});

export const {
  vehicleManagementLoading,
  vehicleManagementFilter,
  vehicleManagementClickRow,
  vehicleManagementDetail,
  vehicleManagementClickRowSetInit,
  vehicleManagementSurchargeRow,
} = vehicleManagementSlice.actions;
export default vehicleManagementSlice.reducer;
