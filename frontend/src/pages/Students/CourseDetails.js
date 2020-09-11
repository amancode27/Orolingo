import React, { useEffect } from 'react';
import {useState,setState} from 'react';
import axios from "axios";
import basename from "../Home/basename.js";
import '../style/CourseDetails.css';
import Reviews from './Reviews';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'

const CourseDetails = (props,userinfo) =>{
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

    const [courseDetails,setCourseDetals] = useState({});
    const [trainerDetails,setTrainerDetails] = useState({});
    const id = props.match.params['course_id'];
    useEffect(()=>{
        axios.get(`${basename}/api/course/`)
        .then((res)=>{
            const tmp = res.data.objects;
            tmp.map(k=>{
                if(k.id == id){
                    const coursetmp = {};
                    const trainertmp = {};
                    coursetmp['name'] = k.name;
                    coursetmp['language'] = k.language.name;
                    coursetmp['description'] = k.description;
                    trainertmp['name'] = k.trainer.user.fullname;
                    setCourseDetals(coursetmp);
                    setTrainerDetails(trainertmp);
                }
            });
        });
    },[props.match.params['course_id']]);

    return(
        <div>
            <div id="container">
                <div id="profile">
                    <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" alt="profilephoto" id="profilephoto"></img>
                    <div id="profile-description">
                        Hi!I'm {trainerDetails['name']}.
                    </div>
                </div>
                <div id="main">
                    <div id="course-details">
                        <div id="course-desc">
                            <h1 style={{textAlign:"center",paddingTop:"30px",textDecoration:"underline"}}>Course Details</h1>
                            <ul id="about">
                                <li>Course Name : {courseDetails['name']}</li>
                                <li>Course Duration : </li>
                                <li>Prerequisites : </li>
                                <li>Brief Discription : {courseDetails['description']}</li>
                            </ul>
                                <Link to = {`/purchase/${id}`}>
                                    <Button style ={buttonStyle} color="primary" size="lg">Buy</Button>
                                </Link>
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