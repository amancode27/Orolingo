import React, { useState, useEffect } from "react";
import basename from "./basename.js";
import axios from "axios";
import { Link } from "react-router-dom";
import StudentDashboard from "./StudentDashboard";
import TrainerDashboard from "./TrainerDashboard";

const Dashboard = (props) => {
  // const [userDetail, setUserDetail] = useState({});
  

  // useEffect(() => {
  // }, [props]);

  return (
    <div>
      {props.user.is_student ? <StudentDashboard {...props} />:<TrainerDashboard {...props} />}
    </div>
  );
};

export default Dashboard;
