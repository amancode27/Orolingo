import React from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom'
import FeedbackModal from './ModalForFeedback'

const CourseContent = (props) =>{
    const buttonStyle = {
        width:"300px",
        fontSize:"20px",
        fontFamily: "sans-serif",
        height:"50px",
        marginLeft:"50px",
        borderRadius:"10px"
      };
    return (
        <div>
            <Link to="/dashboard/courses/coursecontent/assignments">
                <Button style ={buttonStyle} color="primary" size="lg">Your Assignments</Button>
            </Link>
            <Link to="/dashboard/courses/coursecontent/notes">
                <Button style ={buttonStyle} color="primary" size="lg">Your Notes</Button>
            </Link>
            <FeedbackModal buttonLabel = {"Give Feedback"} className = {"feedback"} buttonStyle = {buttonStyle}/>
        </div>
    );

}
export default CourseContent;
