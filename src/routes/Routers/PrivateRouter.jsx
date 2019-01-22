import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRouter({ component: Component, auth: Auth, ...rest }) {
  return (
    <Route
      {...rest}
      render={props =>
        Auth ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login-page",
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
}

export default PrivateRouter;
