import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";

const config = () => {
  const store = configureStore({
    reducer: rootReducer,
  });

  return store;
};

export default config;
