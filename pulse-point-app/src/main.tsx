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
import { createTheme } from "@mui/material/styles";
import { blue, amber } from "@mui/material/colors";
import { ThemeProvider } from "@mui/material/styles";
import { outlinedInputClasses } from "@mui/material/OutlinedInput";

const theme = createTheme({
  palette: {
    primary: blue,
    secondary: amber,
  },
  components: {
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "white",
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderColor: "grey",
        },
        root: {
          [`&:hover .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: "white",
          },
          [`&.Mui-focused .${outlinedInputClasses.notchedOutline}`]: {
            borderColor: blue[500],
          },
          color: "white",
        },
      },
    },
  },
});

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "metrics/view/:id", element: <MetricView /> },
      { path: "metrics/add", element: <MetricFormPage /> },
      { path: "metrics/edit", element: <MetricFormPage /> },
      { path: "data-points/add", element: <DataPointFormPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ApiProvider>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ApiProvider>
  </React.StrictMode>
);
