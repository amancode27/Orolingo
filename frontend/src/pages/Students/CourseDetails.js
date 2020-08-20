import React from 'react';
import {useState,setState} from 'react';
import '../style/CourseDetails.css';
import Reviews from './Reviews';
const CourseDetails = (props) =>{
    const [courseDetails,setCourseDetals] = useState({});
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
                        
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseDetails;