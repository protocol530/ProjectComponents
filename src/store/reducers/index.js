import { combineReducers } from "redux";
import orderManagement from "./orderManagementSlice";
import vehicleManagement from "./vehicleManagementSlice";
import driverManagement from "./driverManagementSlice";
import userData from "./userDataSlice";
import commonSlice from "./commonSlice";
import setting from "./settingSlice";
import dashboard from "./dashboardSlice";

export default combineReducers({
  orderManagement,
  vehicleManagement,
  driverManagement,
  userData,
  commonSlice,
  setting,
  dashboard,
});
