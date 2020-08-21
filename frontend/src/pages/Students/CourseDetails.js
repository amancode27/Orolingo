import React from 'react';
import {useState,setState} from 'react';
import '../style/CourseDetails.css';
import Reviews from './Reviews';
import { Button } from 'reactstrap';
const CourseDetails = (props) =>{
    const buttonStyle = {
        width:"100px",
        fontSize:"15px",
        fontFamily: "sans-serif",
        height:"40px",
        borderRadius:"10px",
        left:"80%",
        top:"89%",
        position:"absolute"
      };
    const [courseDetails,setCourseDetals] = useState({"courseName":"English"});
    const [teacherDetails,setTeacherDetails] = useState({});
    return(
        <div>
            <div id="container">
                <div id="profile">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="profilephoto" id="profilephoto"></img>
                    <div id="profile-description">
                        Hi!I'm Anindya.
                    </div>
                </div>
                <div id="main">
                    <div id="review">
                        <Reviews/>
                    </div>
                    <div id="course-details">
                        <div id="course-desc">
                            <h1 style={{textAlign:"center",paddingTop:"30px",textDecoration:"underline"}}>Course Details</h1>
                            <ul id="about">
                                <li>Course Name : </li>
                                <li>Course Duration : </li>
                                <li>Prerequisites : </li>
                                <li>Brief Discription :</li>
                            </ul>
                            <Button style ={buttonStyle} color="primary" size="lg">Buy</Button>
                        </div>
                        <div id="course-video">
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetails;