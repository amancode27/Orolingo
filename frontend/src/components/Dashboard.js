import React, { useState, useEffect } from "react";

const Dashboard = (props) => {
  const [userDetail, setUserDetail] = useState({});

  useEffect(() => {
    console.log(props.userId + " From Dashboard");
    const getDetail = async (userId) => {
      setUserDetail({...(await props.getUserDetail(props.userId))});
    }
    if(props.loggedIn) {
      getDetail(props.userId);
    }
  }, [props]);

  return (
    <div>
      <h1>
        Hi {userDetail.fullname}, you are a
        {userDetail.is_student ? "Student" : userDetail.is_trainer && "Trainer"}
      </h1>
    </div>
  );
};

export default Dashboard;
