import React,{ useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom'
import basename from "../Home/basename.js";
import FeedbackModal from './ModalForFeedback'
import axios from "axios";

const CourseContent = (props,user) =>{
    const buttonStyle = {
        width:"300px",
        fontSize:"20px",
        fontFamily: "sans-serif",
        height:"50px",
        marginLeft:"50px",
        borderRadius:"10px"
      };
      const course_id = props.match.params['id'];
    return (
        
        <div>
            <Link to={`${course_id}/assignments`}>
                <Button style ={buttonStyle} color="primary" size="lg">Your Assignments</Button>
            </Link>
            <Link to={`${course_id}/notes`}>
                <Button style ={buttonStyle} color="primary" size="lg">Your Notes</Button>
            </Link>
            <FeedbackModal {...props} buttonLabel = {"Give Feedback"} className = {"feedback"} buttonStyle = {buttonStyle}/>
        </div>
    );

}
export default CourseContent;
