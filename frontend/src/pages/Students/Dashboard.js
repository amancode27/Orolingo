import React from "react";
import StudentDashboard from "./Student Dashboard/StudentDashboard";
import TrainerDashboard from "../Teachers/Trainer Dashboard/TrainerDashboard.jsx";
import NotFound from "../NotFound/NotFound";

const Dashboard = (props) => {
  return (

    <div>
      {props.user.is_student ? <StudentDashboard {...props} />:props.user.is_trainer ? <TrainerDashboard {...props} />:<NotFound/>}
      
    </div>
  );
};

export default Dashboard;
