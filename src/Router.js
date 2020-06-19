import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./containers/home";
import Login from "./containers/login";

export default (
  <Switch>
    <Route exact path="/" component={Login} />
    <Route path="/login" component={Login} />
    <Route path="/home" component={Home} />
  </Switch>
);
