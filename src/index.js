import React from "react";
import ReactDOM from "react-dom";
import Routes from "./services/RoutesService";
import CssBaseline from "@material-ui/core/CssBaseline";

ReactDOM.render(
  <>
    <CssBaseline />
    <Routes />
  </>,
  document.getElementById("root")
);
