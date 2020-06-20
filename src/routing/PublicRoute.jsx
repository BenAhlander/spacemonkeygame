import React from "react";
import { Route, Redirect } from "react-router-dom";
import { Auth } from "aws-amplify";
import { isUserSignedIn } from "../utils/auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  Auth.currentSession();
  //   console.log({ currentSession });
  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isUserSignedIn() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
