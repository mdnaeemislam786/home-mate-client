import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { router } from "./Routes/router.jsx";
import { RouterProvider } from "react-router";

const root = document.getElementById("root");

ReactDOM.createRoot(root).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
