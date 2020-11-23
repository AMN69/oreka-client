import React from "react";
import { Route, Redirect } from "react-router-dom";
import { withAuth } from "../lib/AuthProvider";
import axios from 'axios';

const AnonRoute = ({ component: Component, isLoggedin, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(props) =>
        !isLoggedin ? <Component {...props} /> : <Redirect to="/private" />
      }
    />
  );
};

export default withAuth(AnonRoute);
