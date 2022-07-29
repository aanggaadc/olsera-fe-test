import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { store } from "../src/store/store";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import Axios from "axios";
Axios.defaults.baseURL = "https://jsonplaceholder.typicode.com/";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
