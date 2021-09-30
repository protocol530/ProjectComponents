import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  filterCondition: {
    request: {
      startDate: null,
      endDate: null,
      state: null,
    },
    accept: {
      startDate: null,
      endDate: null,
      state: null,
    },
    beforeShip: {
      startDate: null,
      endDate: null,
    },
    shipping: {
      startDate: null,
      endDate: null,
    },
    account: {
      startDate: null,
      endDate: null,
      state: null,
    },
  },
  clickTableRow: {
    request: null,
    accept: null,
    beforeShip: null,
    shipping: null,
    account: null,
  },
  modify: null,
};

const orderManagementSlice = createSlice({
  name: "orderManagement",
  initialState,
  reducers: {
    orderManagementLoading(state, action) {
      state.isLoading = action.payload;
    },
    orderManagementRequestFilter(state, action) {},
    orderManagementAcceptFilter(state, action) {},
    orderManagementBeforeShipFilter(state, action) {},
    orderManagementShipppingFilter(state, action) {},
    orderManagementAccountFilter(state, action) {},
    orderManagementRequestClickRow(state, action) {
      const { row } = action.payload;
      state.clickTableRow.request = row;
    },
    orderManagementAcceptClickRow(state, action) {
      const { row } = action.payload;
      state.clickTableRow.accept = row;
    },
    orderManagementBeforeShipClickRow(state, action) {
      const { row } = action.payload;
      state.clickTableRow.beforeShip = row;
    },
    orderManagementShipppingClickRow(state, action) {
      const { row } = action.payload;
      state.clickTableRow.shipping = row;
    },
    orderManagementAccountClickRow(state, action) {
      const { row } = action.payload;
      state.clickTableRow.account = row;
    },
    orderManagementAcceptModify(state, action) {
      const { row } = action.payload;
      state.modify = row;
    },
    orderManagementClickRowSetInit(state) {
      // console.log("clear");
      state.clickTableRow = initialState.clickTableRow;
    },
  },
});

export const {
  orderManagementLoading,
  orderManagementRequestFilter,
  orderManagementAcceptFilter,
  orderManagementBeforeShipFilter,
  orderManagementShipppingFilter,
  orderManagementAccountFilter,
  orderManagementRequestClickRow,
  orderManagementAcceptClickRow,
  orderManagementBeforeShipClickRow,
  orderManagementShipppingClickRow,
  orderManagementAccountClickRow,
  orderManagementAcceptModify,
  orderManagementClickRowSetInit,
} = orderManagementSlice.actions;
export default orderManagementSlice.reducer;
