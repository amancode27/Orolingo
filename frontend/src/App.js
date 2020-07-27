import React, { Component, useState, useEffect } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import Nav from "./components/Nav";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Router from "./components/Router";
import "./App.css";

const App = (props) => {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("token") ? true : false
  );
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState(0);

  useEffect(() => {
    if (loggedIn) {
      fetch("http://localhost:8000/auth/current_user/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(JSON.stringify(json))
          setUsername(json.username);
          setUserId(json.id);
          console.log(json.id);
        });
    }
  }, []);

  const handleLogin = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/token-auth/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        localStorage.setItem("token", json.token);
        setLoggedIn(true);
        setUsername(json.user.username);
        setUserId(json.user.id);
      });
  };

  const handleSignup = (e, data) => {
    e.preventDefault();
    fetch("http://localhost:8000/auth/users/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json)
        localStorage.setItem("token", json.token);
        setLoggedIn(true);
        setUsername(json.username);
        setUserId(json.id);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUsername(username);
  };

  const getUserDetail = async userId => {
    console.log(userId + " from App")
    try {
      const response = await fetch(`http://localhost:8000/auth/users/${userId}/`, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("token")}`,
        },
      })
      if(response.ok) {
        const jsonResponse = await response.json();
        console.log("success");
        console.log(jsonResponse);
        return jsonResponse;
      }
      throw new Error("Request Failed!")
    } catch(error) {
      console.log(error);
    }
  }

  return (
    <Router
      loggedIn={loggedIn}
      username={username}
      userId={userId}
      getUserDetail={getUserDetail}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      handleLogout={handleLogout}
    />
  );
};

export default App;
