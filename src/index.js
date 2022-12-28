import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

import Cookies from "universal-cookie";
import { Provider } from "react-redux";
import store from "./store/index.js";
export const cookies = new Cookies();

export const _host = window.location.host.split(":")[0];
export const _port = window.location.host.split(":")[1];
export const AUTH_PORT = Number(_port) + 1;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);
