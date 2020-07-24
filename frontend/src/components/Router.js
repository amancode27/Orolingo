import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar"
import Login from "./Login";
import Signup from "./Signup";
import Landing from "./Landing";
import NotFound from "./NotFound";

const Router = (props) => {
  const username = props.username;
  const loggedIn = props.loggedIn;
  const handleLogin = props.handleLogin;
  const handleSignup = props.handleSignup;
  const handleLogout = props.handleLogout;
  const userinfo = { username: username, loggedIn: loggedIn };

  return (
    <BrowserRouter basename="/">
      <Navbar />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Landing {...props} {...userinfo} handleLogout={handleLogout} />
          )}
        />
        <Route
          path="/login"
          render={(props) => (
            <Login {...props} {...userinfo} handleLogin={handleLogin} />
          )}
        />
        <Route
          path="/signup"
          render={(props) => (
            <Signup {...props} {...userinfo} handleSignup={handleSignup} />
          )}
        />
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
