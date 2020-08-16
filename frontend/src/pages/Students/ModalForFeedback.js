import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import ReactStars from "react-rating-stars-component";
import './../style/ModalForFeedback.css';


const FeedbackModal = (props) => {
    const className = props.className;
    const buttonLabel = props.buttonLabel;
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    const [Ratings,setRatings] = useState({"teachingQuality":5,});
    const [Comment,setComment] = useState("");
    const ratingChanged = (newRating,name) => {
        console.log(newRating); console.log(Ratings["teachingQuality"]);
        setRatings((prev)=>{
            return {...prev,[name]:newRating}
        });
    };
    const commentChanged = (e) => {
        setComment(e.target.value);
        console.log(Comment);
    };
    const styleModal = {
        height:"300px",
    };
    return (
        <div style={{marginTop:"30px"}}>
            <Button color="danger" onClick={toggle} size="lg" style = {props.buttonStyle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className} >
                <ModalHeader toggle={toggle}>Feedback Form</ModalHeader>
                <ModalBody>
                    <div>
                        <label style={{fontSize:"20px"}}>Teaching Quality</label>
                        <ReactStars  count={5} onChange={(x)=>{ratingChanged(x,"teachingQuality")}} size={24} activeColor="#ffd700"/>
                    </div>

                    <Input style={{fontSize:"20px"}} type="textarea" placeholder="Write your thoughts about the course" rows={5} onChange = {commentChanged}/>
                </ModalBody>
                <ModalFooter >
                    <Button color="primary" onClick={toggle} size="lg">Send</Button>{' '}
                    <Button color="secondary" onClick={toggle} size="lg">Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default FeedbackModal;