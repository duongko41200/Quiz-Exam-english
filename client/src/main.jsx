import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, RouterProvider } from "react-router-dom";

import "./index.css";
import Router from "./router/router";
import { store } from "./store/store";
import { Provider } from "react-redux";

const root = createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <RouterProvider router={Router} />
  </Provider>
);
