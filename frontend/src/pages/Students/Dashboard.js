import React, { useState, useEffect } from "react";
import basename from "./../Home/basename.js";
import axios from "axios";
import { Link } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import TrainerDashboard from "../Teachers/TrainerDashboard";

const Dashboard = (props) => {
  // const [userDetail, setUserDetail] = useState({});
  

  // useEffect(() => {
  // }, [props]);

  return (
    <div>
      {console.log(props.user.is_student )}
      {props.user.is_student ? <StudentDashboard {...props} />:<TrainerDashboard {...props} />}
    </div>
  );
};

export default Dashboard;
