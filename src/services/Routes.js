import React from "react";
import Home from "../pages/Home";
import NotFound from "../pages/NotFound";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Signin from "../pages/Signin";
import Confirmacao from "../pages/Confirmacao";

import { BrowserRouter, Switch, Route } from "react-router-dom";

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact={true} component={Home} />
      <Route path="/login" exact={true} component={Login} />
      <Route path="/profile" exact={true} component={Profile} />
      <Route path="/signin" exact={true} component={Signin} />
      <Route path="/confirmacao" exact={true} component={Confirmacao} />
      /signin
      <Route component={NotFound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;
