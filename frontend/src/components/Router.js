import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./Navbar";
import Login from "./Login";
import Signup from "./Signup";
import Landing from "./Landing";
import NotFound from "./NotFound";
import Footer from "./Footer";
import Dashboard from "./Dashboard";

const Router = (props) => {
  const handleLogin = props.handleLogin;
  const handleSignup = props.handleSignup;
  const handleLogout = props.handleLogout;
  const getUserDetail = props.getUserDetail;
  const userinfo = {
    username: props.username,
    loggedIn: props.loggedIn,
    userId: props.userId,
  };

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
        <Route
          path="/dashboard"
          render={(props) => <Dashboard {...props} {...userinfo} getUserDetail={getUserDetail} />}
        />
        <Route component={NotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
