import React, { useEffect } from 'react';
import {useState,setState} from 'react';
import axios from "axios";
import basename from "../Home/basename.js";
import '../style/CourseDetails.css';
import Reviews from './Reviews';
import { Button, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Container, CssBaseline } from '@material-ui/core';
import { makeStyles, useTheme  } from '@material-ui/core/styles';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    content: {
      flex: '1 0 auto',
      padding: '50px',
    
    },
  }));

const CourseDetails = (props,userinfo) =>{
    const classes = useStyles();
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
                    coursetmp['startdate'] = k.startdate;
                    coursetmp['enddate'] = k.enddate;
                    coursetmp['cost'] = k.cost;
                    coursetmp['description'] = k.description;
                    trainertmp['name'] = k.trainer.user.fullname;
                    setCourseDetals(coursetmp);
                    setTrainerDetails(trainertmp);
                }
            });
        });
    },[props.match.params['course_id']]);

    return(
        <div className={classes.root}>
            <React.Fragment className={classes.content}> 
            
            <CssBaseline/>
            
                <Jumbotron>
                    <h1 className="display-2">
                        Hi! I'm {trainerDetails['name']}.
                    </h1>
                    <hr className="my-2" />
                    <img src="https://source.unsplash.com/200x200/?teacher" alt="profilephoto" id="profilephoto"></img>
                </Jumbotron>
                <div id="container">

                <div id="main">
                    <div id="course-details">
                        <div id="course-desc">
                            <h1 style={{textAlign:"center",paddingTop:"30px",textDecoration:"underline"}}>Course Details</h1>
                            <ul id="about">
                                <li>Course Name : {courseDetails['name']}</li>
                                <li>Start Data  : {courseDetails['startdate']} </li>
                                <li>End Date : {courseDetails['enddate']} </li>
                                <li>Purchase Amount  : Rs. {courseDetails['cost']} </li>
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
            </React.Fragment>
        </div>
    );
}

export default CourseDetails;