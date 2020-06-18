import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import Home from "./containers/home";
import Login from "./containers/login";
import History from "./history";

export default (
  <Router history={History}>
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/login" component={Login} />
      <Route path="/home" component={Home} />
    </Switch>
  </Router>
);
