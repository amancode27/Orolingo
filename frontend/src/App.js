import React, { Component, useState, useEffect } from "react";
import Modal from "./components/Modal";
import axios from "axios";
import Nav from "./components/Nav";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import Router from "./components/Router";
import "./App.css";


const App = (props) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
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
          console.log(JSON.stringify(json));
          setUsername(json.username);
          setUserId(json.id);
          console.log(json.id);
        });
    }
  }, [loggedIn]);

  const handleLogin = (e, data, redirect) => {

    setError(null);
    setLoading(true);
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
        setLoading(false);
        console.log(json);
        localStorage.setItem("token", json.token);
        setLoggedIn(true);
        setUsername(json.user.username);
        setUserId(json.user.id);
        redirect("/dashboard");
      })
      .catch(error => {
        setLoading(false);
        setError("Incorrect Credentials");
        alert("wrong Credentials")
        // if(error.response.status === 401)
        //  setError("Something went wrong. Please try again later.");
      });
  };

  const handleSignup = (e, data, redirect) => {
    setError(null);
    setLoading(true);
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
        setLoading(false);
        console.log(json);
        localStorage.setItem("token", json.token);
        setLoggedIn(true);
        setUsername(json.username);
        setUserId(json.id);
        redirect("/dashboard");
      }).catch(error => {
        setLoading(false);
        if (error.response.status === 401) alert(error.response.data.message);
        else setError("Something went wrong. Please try again later.");
      });
  };

  const handleSocialLogin = (response, provider, redirect) => {
    const accessToken = response.accessToken;
    const data = {
      provider: provider,
      access_token: accessToken,
    };
    fetch("http://localhost:8000/auth/oauth/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.newAccount) {
          console.log("Entered 69");
          redirect("/account-choice", { json: json });
        } else {
          localStorage.setItem("token", json.token)
          setLoggedIn(true);
          setUsername(json.username);
          setUserId(json.userId);
          redirect("/dashboard");
          console.log(json);
        }
      });
  };

  const handleSocialTrainerStudent = (userData, type, redirect) => {
    const data = {
      is_student: (type === "Student"),
      is_trainer: (type === "Trainer"),
    };
    fetch(`http://localhost:8000/auth/users/${userData.userId}/`, {
      method: "PATCH",
      headers: {
        Authorization: `JWT ${userData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((json) => {
        localStorage.setItem("token", json.token)
        setLoggedIn(true);
        setUsername(json.username);
        setUserId(json.id)
        console.log(json);
        redirect("/dashboard");
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    setUsername(username);
  };

  const getUserDetail = async (userId) => {
    console.log(userId + " from App");
    try {
      const response = await fetch(
        `http://localhost:8000/auth/users/${userId}/`,
        {
          headers: {
            Authorization: `JWT ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("success");
        console.log(jsonResponse);
        return jsonResponse;
      }
      throw new Error("Request Failed!");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Router
      loggedIn={loggedIn}
      username={username}
      userId={userId}
      getUserDetail={getUserDetail}
      handleLogin={handleLogin}
      handleSignup={handleSignup}
      handleLogout={handleLogout}
      handleSocialLogin={handleSocialLogin}
      handleSocialTrainerStudent={handleSocialTrainerStudent}
    />
  );
};

export default App;
