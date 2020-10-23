import React, { useState } from 'react';
import {  Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import ReactStars from "react-rating-stars-component";
import './../style/ModalForFeedback.css';
import axios from 'axios';
import basename from "../Home/basename.js";
import { Alert } from 'reactstrap';
import Button from '@material-ui/core/Button';


const FeedbackModal = (props) => {
    const className = props.className;
    const buttonLabel = props.buttonLabel;
    const [modal, setModal] = useState(false);
    const toggle = () => {setAlert(false); setModal(!modal);}

    const [alert,setAlert] = useState(false);
    const [Ratings,setRatings] = useState({"courseQuality":5,});
    const [Comment,setComment] = useState("");
    const ratingChanged = (newRating,name) => {
        setRatings((prev)=>{
            return {...prev,[name]:newRating}
        });
    };
    const commentChanged = (e) => {
        setComment(e.target.value);
    };
    const styleModal = {
        height:"300px",
    };
    const submitForm = (e) =>{
        console.log("Hello");
        console.log(props);
        const student_id = props.userId;
        const student_course_id = props.match.params['id'];
        let course_id;
        axios.get(`${basename}/api/student_course/${student_course_id}`)
             .then(res=>{
                course_id = res.data.course['id'];
             }).then(()=>{
                axios.get(`${basename}/api/feedback/?student=${student_id}&course=${course_id}`)
             .then(res=>{
                if(res.data.objects.length){
                    console.log("You have already given a feedback");
                    setAlert(true);
                }
                else{
                    axios.get(`${basename}/api/student/${student_id}`)
                        .then(studentres=>{
                            axios.get(`${basename}/api/course/${course_id}`)
                                .then(courseres=>{
                                    axios.post(`${basename}/api/feedback/`,{
                                        "body": Comment,
                                        "course": courseres.data,
                                        "rating": Ratings["courseQuality"],
                                        "student": studentres.data,
                                        "title": "idk"
                                    });
                                })
                        })
                    toggle();
                }
             });
             })
    }
    let element;
    if(alert){
        element = <Alert color="danger">
                            You can only give one feedback!
                        </Alert>;
    }
    else
        element = <div></div>;
    return (
        <div>
            <Button color="primary" variant="outlined" onClick={toggle} size="lg" style = {{float : "right"}}>{buttonLabel}</Button>
            {/* <Button color="danger" onClick={toggle} size="lg" style = {props.buttonStyle}>{buttonLabel}</Button> */}
            <Modal isOpen={modal} toggle={toggle} className={className} >
                <ModalHeader toggle={toggle}>Feedback Form</ModalHeader>
                <ModalBody>
                    <Form style={{marginBottom:"20px"}}>
                        <div>
                            <label style={{fontSize:"20px"}}>Course Quality</label>
                            <ReactStars  count={5} onChange={(x)=>{ratingChanged(x,"courseQuality")}} size={24} activeColor="#ffd700"/>
                        </div>
                        <Input style={{fontSize:"20px"}} type="textarea" placeholder="Write your thoughts about the course" rows={5} onChange = {commentChanged}/>
                    </Form>   
                    {element}
                </ModalBody>
                <ModalFooter >
                    <Button color="primary" variant="contained" onClick={submitForm} size="lg">Send</Button> {'  '}
                    <Button color="secondary" variant="contained" onClick={toggle} size="lg" style={{marginLeft:"20px"}}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default FeedbackModal;