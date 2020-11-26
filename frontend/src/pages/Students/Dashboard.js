import React, { useState, useEffect } from "react";
import StudentDashboard from "./StudentDashboard";
import TrainerDashboard from "../Teachers/Trainer Dashboard/TrainerDashboard.jsx";
import NotFound from "../Authentication/NotFound";

const Dashboard = (props) => {
  return (

    <div>
      {props.user.is_student ? <StudentDashboard {...props} />:props.user.is_trainer ? <TrainerDashboard {...props} />:<NotFound/>}
      
    </div>
  );
};

export default Dashboard;
