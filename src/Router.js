import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home";
import Login from "./containers/login";
import VerifyUser from "./containers/verifyUser";
import PrivateRoute from "./routing/PublicRoute";

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/login" component={Login} />
    <PrivateRoute path="/home" component={Home} />
    <Route path="/verify" component={VerifyUser} />
  </Switch>
);
