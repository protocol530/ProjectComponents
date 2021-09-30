import { defaultPostApiSet } from "./api";

import { URLPATH } from "../assets/data/common";
export const handleLogout = async () => {
  try {
    const path = URLPATH.logoutLogis;
    localStorage.removeItem("userData");
    sessionStorage.removeItem("userData");
    await defaultPostApiSet("", path);
    // await apiPostLogoutLogis(path);
    // localStorage.removeItem("firebaseToken");
    // localStorage.removeItem("userType");
  } catch (err) {
    console.log(err);
  }
};
