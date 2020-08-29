import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Navbar from "./../Home/Navbar";
import Login from "./Login";
import Signup from "./Signup";
import Landing from "../Home/Landing";
import NotFound from "./NotFound";
import Footer from "./../Home/Footer";
import Dashboard from "../Students/Dashboard";
import AccountChoice from "./AccountChoice";
import StudentCourse from "../Students/StudentCourse";
import LanguageTrainers from "../Teachers/LanguageTrainers";
import CourseContent from "../Students/CourseContent";
import Assignments from "../Students/Assignments";
import Notes from "../Students/Notes";
import Courses from "../Students/Courses";
import CourseDetails from "../Students/CourseDetails";
import purchase from "../payment/purchase";
 

const Router = (props) => {
    const handleLogin = props.handleLogin;
    const handleSignup = props.handleSignup;
    const handleLogout = props.handleLogout;
    const handleSocialLogin = props.handleSocialLogin;
    const getUserDetail = props.getUserDetail;
    const userinfo = {
        username: props.username,
        loggedIn: props.loggedIn,
        userId: props.userId,
        user: props.user,
    };
    const handleSocialTrainerStudent = props.handleSocialTrainerStudent;

    return (
        <BrowserRouter basename='/'>
            <Navbar />
            <Switch>
                <Route
                    exact
                    path='/'
                    render={(props) => (
                        <Landing
                            {...props}
                            {...userinfo}
                            handleLogout={handleLogout}
                        />
                    )}
                />
                <Route
                    path='/login'
                    render={(props) => (
                        <Login
                            {...props}
                            {...userinfo}
                            handleLogin={handleLogin}
                            handleSocialLogin={handleSocialLogin}
                        />
                    )}
                />
                <Route
                    path='/signup'
                    render={(props) => (
                        <Signup
                            {...props}
                            {...userinfo}
                            handleSignup={handleSignup}
                        />
                    )}
                />
                <Route
                    exact
                    path='/dashboard'
                    render={(props) => (
                        <Dashboard
                            {...props}
                            {...userinfo}
                            getUserDetail={getUserDetail}
                        />
                    )}
                />
                {/* <Route
                    exact
                    path='/dashboard/courses/coursecontent'
                    render={(props) => <CourseContent />}
                /> */}
                <Route
                    exact
                    path='/dashboard/courses/coursecontent/:id'
                    render={(props) => <CourseContent {...props} {...userinfo}/>}
                />
                <Route
                    exact
                    path='/dashboard/courses/coursecontent/:id/assignments'
                    render={(props) => <Assignments {...props}/>}
                />
                <Route
                    exact
                    path='/dashboard/courses/coursecontent/:id/notes'
                    render={(props) => <Notes {...props}/>}
                />
                <Route
                    exact
                    path='/dashboard/courses/:language'
                    render={(props) => <Courses {...props} />}
                />
                <Route
                    exact
                    path='/dashboard/courses/details/:course_id'
                    render={(props) => (<CourseDetails {...props} {...userinfo}/>)}
                />
                <Route
                    path='/account-choice'
                    render={(props) => (
                        <AccountChoice
                            {...props}
                            handleSocialTrainerStudent={
                                handleSocialTrainerStudent
                            }
                        />
                    )}
                />
                <Route
                    path='/student-course/:courseid'
                    render={(props) => (
                        <StudentCourse {...props} />
                    )}
                />
                <Route
                    path='/language-trainers/:languageid'
                    render={(props) => (
                        <LanguageTrainers {...props} {...userinfo} />
                    )}
                />
                <Route
                    path = '/purchase'
                    component = {purchase} 
                />
                <Route component={NotFound} />
            </Switch>
            <Footer />
        </BrowserRouter>
    );
};

export default Router;
