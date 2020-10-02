import React, { useState, useEffect } from "react";
import StudentDashboard from "./StudentDashboard";
import TrainerDashboard from "../Teachers/Trainer Dashboard/TrainerDashboard.jsx";

const Dashboard = (props) => {
  return (

    <div>
      {props.user.is_student ? <StudentDashboard {...props} />:<TrainerDashboard {...props} />}
    </div>
  );
};

export default Dashboard;
