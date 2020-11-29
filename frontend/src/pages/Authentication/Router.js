import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import NavBar from "./../Home/Navbar";
import Login from "./Login";
import Signup from "./Signup";
import Landing from "../Home/Landing/Landing";
import NotFound from "./NotFound";
import Footer from "./../Home/Footer";
import Dashboard from "../Students/Dashboard";
import AccountChoice from "./AccountChoice";
import LanguageTrainers from "../Teachers/LanguageTrainers";
import CourseContent from "../Students/CourseContent";
import Assignments from "../Students/Assignments";
import Notes from "../Students/Notes";
import Courses from "../Students/Courses";
import CourseDetails from "../Students/CourseDetails";
import Purchase from "../payment/purchase";
import CreateCourse from "../Teachers/CreateCourse";
import TrainerUpload from "../Teachers/TrainerUpload";
import TrainerCourses from "../Teachers/TrainerCourses";
import EditCourse from "../Teachers/EditCourse";
import ChatApp from "../Teachers/ChatApp";
import Feedback from "../Teachers/feedback";
import PasswordReset from "./PasswordResetConfirm";
import EmailRequest from "./EmailRequest";
import Videos from "../Students/Videos";
import TellUs from '../Home/TellUs/TellUs';
import Services from "../Services/services"
import Languages from "../Home/Languages/Languages";

const Router = (props) => {
  const handleLogin = props.handleLogin;
  const handleSignup = props.handleSignup;
  const handleLogout = props.handleLogout;
  const handleSocialLogin = props.handleSocialLogin;
  const getUserDetail = props.getUserDetail;
  const error = props.errors;
  const error1 = props.error1;
  const userinfo = {
    username: props.username,
    loggedIn: props.loggedIn,
    userId: props.userId,
    user: props.user,
  };
  const handleSocialTrainerStudent = props.handleSocialTrainerStudent;

  return (
    <BrowserRouter basename="/">
      <NavBar {...props} {...userinfo} handleLogout={handleLogout} />
      <Switch>
        <Route
          exact
          path="/"
          render={(props) => (
            <Landing {...props} {...userinfo} handleLogout={handleLogout} />
          )}
        />    
        <Route
          exact 
          path="/languages"
          render={(props)=>(
            <Languages {...props} {...userinfo} handleLogout={handleLogout} />
          )}
        />
        <Route exact path="/password-reset-confirm" component={PasswordReset} />
        <Route exact path="/password-reset" component={EmailRequest} />
        <Route
          path="/login"
          render={(props) => (
            <Login
              {...props}
              {...userinfo}
              error={error}
              handleLogin={handleLogin}
              handleSocialLogin={handleSocialLogin}
            />
          )}
        />
        <Route
          path="/signup"
          render={(props) => (
            <Signup
              error1={error1}
              {...props}
              {...userinfo}
              handleSignup={handleSignup}
            />
          )}
        />
        <Route
          exact
          path="/dashboard"
          render={(props) => (
            <Dashboard {...props} {...userinfo} getUserDetail={getUserDetail} />
          )}
        />
        <Route
          exact
          path="/dashboard/courses/coursecontent/:id"
          render={(props) => <CourseContent {...props} {...userinfo} />}
        />
        <Route
          exact
          path="/dashboard/courses/coursecontent/:id/assignments"
          render={(props) => <Assignments {...props} />}
        />
        <Route
          exact
          path="/dashboard/courses/coursecontent/:id/notes"
          render={(props) => <Notes {...props} />}
        />
        <Route
          exact
          path="/dashboard/courses/coursecontent/:id/videos"
          render={(props) => <Videos {...props} />}
        />
        <Route
          exact
          path="/dashboard/courses/:language"
          render={(props) => <Courses {...props} />}
        />
        <Route
          exact
          path="/dashboard/courses/details/:course_id"
          render={(props) => <CourseDetails {...props} {...userinfo} />}
        />
        <Route
          path="/account-choice"
          render={(props) =>
            (
              <AccountChoice
                {...props}
                handleSocialTrainerStudent={handleSocialTrainerStudent}
              />
            )
          }
        />

        <Route
          exact
          path="/dashboard/createcourse"
          render={(props) => <CreateCourse {...props} {...userinfo} />}
        />

        <Route
          exact
          path="/dashboard/editcourse/:id"
          render={(props) => <EditCourse {...props} {...userinfo} />}
        />

        <Route
          exact
          path="/dashboard/trainercourses/uploads/:id"
          render={(props) => <TrainerUpload {...props} {...userinfo} />}
        />

        <Route
          exact
          path="/dashboard/trainercourses/feedback/:id"
          render={(props) => <Feedback {...props} {...userinfo} />}
        />

        <Route
          path="/language-trainers/:languageid"
          render={(props) => <LanguageTrainers {...props} {...userinfo} />}
        />

        <Route
          path="/purchase/:id"
          render={(props) => <Purchase {...props} {...userinfo} />}
        />

        <Route
          path="/dashboard/trainercourses/:language"
          render={(props) => <TrainerCourses {...props} {...userinfo} />}
        />
        <Route
          path="/dashboard/chatapp/:id"
          render={(props) => <ChatApp {...props} {...userinfo} />}
        />
        <Route
          path="/tellus"
          render = {(props) => <TellUs {...props} /> }
        />
        <Route
          path="/services"
          render={(props) => <Services {...props} />}
        />

        <Route component={NotFound} />
      </Switch>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
