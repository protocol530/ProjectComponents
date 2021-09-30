import axios from "axios";
import dotenv from "dotenv";
import { jwtVerify } from "./jwt";
import { URLPATH } from "../assets/data/common";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { handleLogout } from "../utils/logout";
import { errorHandler } from "../store/reducers/commonSlice";

dotenv.config({ path: "../../.env" });

const baseUrl = process.env.REACT_APP_BASE_URL;

const loginHeader = {
  clienttype: "WEB",
};

const getLoginHeader = () => {
  const localStorage = window.localStorage.userData;
  const sessionStorage = window.sessionStorage.userData;
  const { userid, accesstoken } = jwtVerify(
    localStorage ? localStorage : sessionStorage
  );

  const headers = {
    userid: userid,
    accesstoken: accesstoken,
    clienttype: "WEB",
  };
  return headers;
};

const ax = axios.create({
  baseURL: baseUrl,
  headers: {},
});

// Post
export const apiPostLoginLogis = (form) => {
  return axios.post(`${baseUrl}${URLPATH.loginLogis}`, form, {
    headers: loginHeader,
  });
};

export const defaultGetApiSet = (req, path) => {
  const config = {
    headers: getLoginHeader(),
    params: { ...req },
  };
  return ax.get(path, config);
};

export const defaultPostApiSet = (formData, path) => {
  const config = {
    headers: getLoginHeader(),
  };
  return ax.post(path, formData, config);
};

export const defaultPutApiSet = (formData, path) => {
  const config = {
    headers: getLoginHeader(),
  };
  return ax.put(path, formData, config);
};

export const defaultDelApiSet = (req, path) => {
  const config = {
    headers: getLoginHeader(),
    data: req,
  };
  return ax.delete(path, config);
};

let onError = false;
export const defaultErrorControl = (dispatch) => async (api) => {
  try {
    return await api();
  } catch (err) {
    if (onError) return;
    switch (err.response.status) {
      case 401:
        dispatch(errorHandler("overlapLogin"));
        console.log("error");
        onError = "overlapLogin";
        localStorage.removeItem("userData");
        sessionStorage.removeItem("userData");
        alert("중복 로그인이 확인되었습니다.");
        // window.location.reload();
        return;
      default:
        return;
    }
  }
};
