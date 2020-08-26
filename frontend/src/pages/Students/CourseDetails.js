import React, { useEffect } from 'react';
import {useState,setState} from 'react';
import axios from "axios";
import basename from "../Home/basename.js";
import '../style/CourseDetails.css';
import Reviews from './Reviews';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

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
    const [redirect,setRedirect] = useState(false);
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
                    trainertmp['name'] = k.trainer.user.fullname;
                    setCourseDetals(coursetmp);
                    setTrainerDetails(trainertmp);
                }
            });
        });
    },[props.match.params['course_id']]);

    const updateStudentCourse = (e) =>{
        const student_id = props.userId;
        const course_id = props.match.params['course_id'];
        axios.get(`${basename}/api/student/${student_id}`)
            .then(studentres=>{
                axios.get(`${basename}/api/course/${course_id}`)
                    .then(courseres=>{
                        axios.get(`${basename}/api/student_course/?course=${course_id}&student=${student_id}`)
                            .then(res3=>{
                                if(!res3.data.objects.length){
                                        axios.post(`${basename}/api/student_course/`,{
                                        "completed_percent":0,
                                        "course":courseres.data,
                                        "enddate": "2021-04-21",
                                        "startdate": "2020-08-24",
                                        "student":studentres.data
                                    }).then(()=>setRedirect(true));
                                    
                                }
                            })
                    })
            })
    };
    if(redirect){
        return <Redirect to='/dashboard' />;
    }
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
                    {/* <div id="review">
                        <Reviews/>
                    </div> */}
                    <div id="course-details">
                        <div id="course-desc">
                            <h1 style={{textAlign:"center",paddingTop:"30px",textDecoration:"underline"}}>Course Details</h1>
                            <ul id="about">
                                <li>Course Name : {courseDetails['name']}</li>
                                <li>Course Duration : </li>
                                <li>Prerequisites : </li>
                                <li>Brief Discription : This is a course for {courseDetails['language']}</li>
                            </ul>
                            
                                <Button onClick = {updateStudentCourse} style ={buttonStyle} color="primary" size="lg">Buy</Button>
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