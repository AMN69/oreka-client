import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from 'axios';

const AnonRoute = ({ component: Component, isLoggedin, ...rest }) => {
  console.log(isLoggedin);
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedin ? <Component {...props} /> : <Redirect to="/dashboard" />
      }
    />
  );
};

export default withAuth(AnonRoute);
