import React, { useState, useEffect } from "react";
import '../style/TrainerUpload.css';
import PropTypes from "prop-types";
import basename from "../Home/basename.js";
import axios from "axios";
import {ListGroup, Card, ListGroupItem, Button } from "reactstrap";
import { Form, FormGroup, Label, Input, FormText ,Container,Row,Col} from 'reactstrap';
import UploadModal from './UploadModal';
import { Link } from 'react-router-dom'
import {
    CardTitle,
    CardBody,
    CardText,
    
} from "reactstrap";
import ReactStars from "react-rating-stars-component";



import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function AutoGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>xs=6</Paper>
        </Grid>
        <Grid item xs>
          <Paper className={classes.paper}>xs</Paper>
        </Grid>
      </Grid>
    </div>
  );
}









const Page = (props) => {
    const buttonStyle = {
        width:"150px",
        fontSize:"14px",
        fontFamily: "sans-serif",
        height:"40px",
        borderRadius:"10px"
      };
    let i=0;
    const[assignment,setAssignment] = useState([]);
    const[notes,setNotes] = useState([]);
    const[lectures,setLectures] = useState([]);
    const [feedback,setFeedback] = useState([]);
    useEffect(()=>{
        const course_id = props.match.params['id'];
        axios.get(`${basename}/api/assignments/?course=${course_id}`)
             .then(res=>{
                 const a = res.data.objects;
                 a.map(k=>{
                    const tmp = {};
                    tmp['id'] = k.id;
                    tmp['topic'] = k.topic;
                    tmp['description'] = k.description;
                    tmp['created_at'] = k.created_at;
                    tmp['pdf'] = k.pdf;
                    setAssignment(prev=>{
                        return [...prev,tmp];
                    })
                 });
             })
        axios.get(`${basename}/api/note/?course=${course_id}`)
             .then(res=>{
                 const a = res.data.objects;
                 a.map(k=>{
                    const tmp = {};
                    tmp['id'] = k.id;
                    tmp['topic'] = k.topic;
                    tmp['description'] = k.description;
                    tmp['created_at'] = k.created_at;
                    tmp['pdf'] = k.pdf;
                    setNotes(prev=>{
                        return [...prev,tmp];
                    })
                 });
             })
        axios.get(`${basename}/api/feedback/?course=${course_id}`)
             .then(res=>{
                 const tmp1 = res.data.objects;
                 tmp1.map(k=>{
                    const tmp={};
                    console.log(k);
                    tmp['rating'] = k['rating'];
                    tmp['body'] = k['body'];
                    axios.get(`${basename}${k['student']}`)
                        .then(res1=>{
                            console.log(res1);
                            tmp['fullname'] = res1.data.user['fullname'];
                            setFeedback(prev=>{
                                return [...prev,tmp];
                            });
                        })
                 })
                 //setFeedback([...res.data.objects]);
             })
    },[props.match.params['id']])

    const deleteAssignment = (id) =>{
        axios.delete(`${basename}/api/assignments/${id}/`);
        setAssignment(prev=>prev.filter(e=>{
            return e.id!=id;
        }))
    }
    
    const deleteNote = (id) =>{
        axios.delete(`${basename}/api/note/${id}/`);
        setNotes(prev=>prev.filter(e=>{
            return e.id!=id;
        }))
    }
    
    let elem=<div></div>;

    if(feedback.length>=2){
        let len = feedback.length;
        elem = (<Container>
        <Row style={{backgroundColor:"wheat",paddingRight:"15px",padding:"30px"}}>
            <Col sm="6">
                <Card body>
                    <div>
                        <label style={{fontSize:"15px",padding:"0px",margin:"0px"}}>Course Quality</label>
                        <ReactStars  count={5} value={feedback[i%len]['rating']} edit={false} size={20} activeColor="#ffd700"/>
                    </div>
                    <CardText style={{fontSize:"15px"}}>
                        {feedback[i%len]['body']}
                    </CardText>
                    <div style={{fontSize:"20px"}}>
                        <p style={{float:"right"}}>
                            -{feedback[i%len]['fullname']}
                        </p>
                    </div>
                </Card>
            </Col>  
            <Col sm="6">
                <Card body>
                    <div>
                        <label style={{fontSize:"15px",padding:"0px",margin:"0px"}}>Course Quality</label>
                        <ReactStars  count={5} value={feedback[(i+1)%len]['rating']} edit={false} size={20} activeColor="#ffd700"/>
                    </div>
                    <CardText style={{fontSize:"15px"}}>
                        {feedback[(i+1)%len]['body']}
                    </CardText>
                    <div style={{fontSize:"20px"}}>
                        <p style={{float:"right"}}>
                            -{feedback[(i+1)%len]['fullname']}
                        </p>
                    </div>
                </Card>
            </Col> 
        </Row>
    </Container>);
    }
    return(
        <div>
        {elem}
        <div id="grid-container" style={{paddingLeft:"150px",paddingRight:"150px"}}>
            <div id="grid-item">
                <header>ASSIGNMENTS</header>
                <p>
                <UploadModal {...props}  {...{'content':'assignments'}} buttonLabel = {"Upload Assignment"} className = {"feedback"} buttonStyle = {buttonStyle}/>
                </p>
                
                {assignment.map(k=>(
                    <div class ='content'>
                        <header>{k.topic}</header>
                        <h2>
                            Description: {k.description}
                        </h2>
                        <h4>Date-uploaded: {k.created_at}</h4>
                        <h4>Date-to-be-submitted</h4>
                        <button id='delete' onClick={()=>deleteAssignment(k.id)}>Delete</button>
                        <a href={`http://localhost:8000${k.pdf}`} target='blank'>
                            <button id='download'>Download</button>
                        </a>
                    </div>
                ))}
            </div>


            <div id="grid-item">
                <header>NOTES</header>
                <p>
                <UploadModal {...props} {...{'content':'note'}} buttonLabel = {"Upload Notes"} className = {"feedback"} buttonStyle = {buttonStyle}/>    
                </p>
                {notes.map(k=>(
                    <div class ='content'>
                        <header>{k.topic}</header>
                        <h2>
                            Description: {k.description}
                        </h2>
                        <h4>Date-uploaded: {k.created_at}</h4>
                        <h4>Date-to-be-submitted</h4>
                        <button id='delete' onClick={()=>deleteNote(k.id)}>Delete</button>
                        <a href={`http://localhost:8000${k.pdf}`} target='blank'>
                            <button id='download'>Download</button>
                        </a>
                    </div>
                ))}
            </div>



            <div id="grid-item">
                <header>LECTURES</header>
                <h3>Go LIVE</h3>
                {/* <div id ='content'>
                    <header>Assignment Name</header>
                    <h2>
                        Assignment Content
                    </h2>
                    <h4>Date-uploaded</h4>
                    <h4>Date-to-be-submitted</h4>
                    <button id='delete'>Delete</button>
                    <button id='download'>Download</button>
                </div>            */}
            </div>
        </div>
    </div>
    );
}; 

export default Page;
