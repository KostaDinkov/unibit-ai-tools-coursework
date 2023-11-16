import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./routes/Home.tsx";
import MetricView from "./routes/MetricView.tsx";
import ApiProvider from "./context/ApiProvider.tsx";
import MetricFormPage from "./routes/MetricFormPage.tsx";
import DataPointFormPage from "./routes/DataPointFormPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path:"/",element: <Home /> },
      { path: "/metrics/view/:id", element: <MetricView /> },
      { path: "/metrics/add", element: <MetricFormPage/>},
      { path: "/metrics/edit", element: <MetricFormPage/>},
      { path: "/data-points/add", element: <DataPointFormPage />}
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider>
      <RouterProvider router={router} />
    </ApiProvider>
  </React.StrictMode>
);
