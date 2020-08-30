import React, { useState, useEffect } from "react";
import '../style/TrainerUpload.css';
import PropTypes from "prop-types";
import basename from "../Home/basename.js";
import axios from "axios";
import {ListGroup, Card, ListGroupItem, Button } from "reactstrap";
import { Form, FormGroup, Label, Input, FormText ,Container,Row,Col} from 'reactstrap';
import UploadModal from './UploadModal';
import { Link } from 'react-router-dom'

const Page = (props) => {
    const buttonStyle = {
        width:"150px",
        fontSize:"14px",
        fontFamily: "sans-serif",
        height:"40px",
        borderRadius:"10px"
      };
    const[assignment,setAssignment] = useState([]);
    const[notes,setNotes] = useState([]);
    const[lectures,setLectures] = useState([]);
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
    console.log(assignment);
    return(
        <div id="grid-container">
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
    );
}; 

export default Page;
