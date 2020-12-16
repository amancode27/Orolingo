import React, { Component, useState, useEffect } from "react";
import axios from "axios";
import basename from "./pages/Home/basename.js";
import Router from "./pages/Authentication/Router";
import "./App.css";


const App = (props) => {
    const [loading, setLoading] = useState(false);
    const [errors, setError] = useState(null);
    const [error1, setError1] = useState(null);
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem("token") ? true : false
    );
    const [username, setUsername] = useState("");
    const [userId, setUserId] = useState(0);
    const [user, setUser] = useState({});
    
    // const [is_student,setstudent] =useState("");
    // const [is_trainer,setTeacher] =useState("");

    useEffect(() => {
        if (loggedIn) {
            fetch("http://localhost:8000/auth/current_user/", {
                headers: {
                    Authorization: `JWT ${localStorage.getItem("token")}`,
                },
            })
                .then((res) => res.json())
                .then((json) => {
                    setUsername(json.username);
                    setUserId(json.id);
                    setUser(json);
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
                if (json.username && data.username !== json.username) {
                    throw new Error(json.username);
                  }
                  if (json.password && data.password !== json.password) {
                    throw new Error(json.password);
                  }
                  if (json.non_field_errors) {
                    throw new Error(json.non_field_errors[0]);
                  }
                localStorage.setItem("token", json.token);
                setLoggedIn(true);
                setUsername(json.user.username);
                setUserId(json.user.id);
                setUser(json.user);

                redirect("/dashboard");
            })
            .catch((error) => {
                setLoading(false);
                setError("Incorrect Credentials");
                document.getElementById(
                  "login-form-error"
                ).textContent = error.toString().substring(7);
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
                if (
                    json.username &&
                    json.email &&
                    data.username !== json.username &&
                    data.email !== json.email
                ) {
                    throw new Error(
                        json.username.join("<br />") +
                            "<br />" +
                            json.email.join("<br />")
                    );
                } else if (json.username && data.username !== json.username) {
                    throw new Error(json.username.join("<br />"));
                } else if (json.email && data.email !== json.email) {
                    throw new Error(json.email.join("<br />"));
                }

                if (json.username && data.username !== json.username) {
                    throw new Error(json.username);
                  }
                  if (json.password && data.password !== json.password) {
                    throw new Error(json.password);
                  }
                  if (json.non_field_errors) {
                    throw new Error(json.non_field_errors[0]);
                  }

                localStorage.setItem("token", json.token);
                setLoggedIn(true);
                setUsername(json.username);
                setUserId(json.id);
                setUser(json); 
                redirect("/dashboard");
            })
            .catch((error) => {
                setLoading(false);
                setError("Something went wrong. Please try again later.");

                setError1("Something went wrong. Please try again later.");
                document.getElementById(
                  "signup-form-error"
                ).textContent = error.toString().substring(7);
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
                    redirect("/account-choice", { json: json });
                } else {
                    localStorage.setItem("token", json.token);
                    setLoggedIn(true);
                    setUsername(json.username);
                    setUserId(json.userId);
                    setUser(json);
                    redirect("/dashboard");
                }
            });
    };

    const handleSocialTrainerStudent = (userData, type, redirect) => {
        const data = {
            is_student: type === "Student",
            is_trainer: type === "Trainer",
        };
        if(type == "Student"){                
            axios({
                method: 'get',
                url: `http://localhost:8000/auth/users/${userData.userId}/`,
                headers: {
                    Authorization: `JWT ${userData.token}`,
                    "Content-Type": "application/json",
                },
            })
            .then(res =>{
                axios.post(`${basename}/api/student/`,{
                    'user':res.data,
                    'languages_learnt':[],
                    'languages_to_learn':[]
                })
            })
        }
        else{
            axios({
                method: 'get',
                url: `http://localhost:8000/auth/users/${userData.userId}/`,
                headers: {
                    Authorization: `JWT ${userData.token}`,
                    "Content-Type": "application/json",
                },
            })
            .then(res=>{
                axios.post(`${basename}/api/trainer/`,{
                    'user':res.data
                })
            })
        }
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
                localStorage.setItem("token", json.token);
                setLoggedIn(true);
                setUsername(json.username);
                setUserId(json.id);
                setUser(json);
                
                redirect("/dashboard");
            });
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        setUsername(username);
        setUser({});
    };

    const getUserDetail = async (userId) => {
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
            user={user}
            errors={errors}
            error1={error1}
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
