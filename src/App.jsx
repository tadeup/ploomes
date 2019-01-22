import React from "react";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import PrivateRouter from "routes/Routers/PrivateRouter";
import indexRoutes from "routes/index.jsx";

import "assets/scss/material-kit-react.css?v=1.3.0";

var hist = createBrowserHistory();
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const isAuth = localStorage.getItem("User-Key");
    return (
      <Router history={hist}>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return prop.isPublic ? (
              <Route
                exact
                path={prop.path}
                key={key}
                component={prop.component}
              />
            ) : (
              <PrivateRouter
                exact
                path={prop.path}
                key={key}
                component={prop.component}
                auth={isAuth}
              />
            );
          })}
        </Switch>
      </Router>
    );
  }
}

export default App;
