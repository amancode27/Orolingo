import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input, Label, Form, FormGroup } from 'reactstrap';
import ReactStars from "react-rating-stars-component";
import './../style/ModalForFeedback.css';
import axios from 'axios';
import basename from "../Home/basename.js";
import { Alert } from 'reactstrap';
import { Redirect } from 'react-router';

const UploadModal = (props) => {
    console.log(props);
    const className = props.className;
    const buttonLabel = props.buttonLabel;
    const [modal, setModal] = useState(false);
    const toggle = () => {setModal(!modal);}
    const [upload,setUpload] = useState({});
    const course_id = props.match.params['id'];

    const changeField = (e) =>{
        const field = e.target.name;
        const value = e.target.value;
        setUpload(prev=>{
            return {...prev,[field]:value};
        })
    }


    const submitData = () =>{
        let formdata = new FormData();
        var filedata = document.getElementById("file");
        formdata.append('pdf',filedata.files[0],filedata.files[0].name);
        formdata.append('topic',upload['topic']);
        formdata.append('description',upload['description']);
        console.log(formdata);
        axios.get(`${basename}/api/course/${course_id}`)
             .then(res=>{
                formdata.append('course',res.data['resource_uri']);
                axios({
                    method: 'post',
                    url: `${basename}/api/${props['content']}/`,
                    data: formdata,
                    header: {
                              'Accept': 'application/json',
                              'Content-Type': 'multipart/form-data',
                            },
                      }).then(()=>{toggle();window.location.reload(false);}
                      )
             });
    }

    const styleModal = {
        height:"300px",
    };
    console.log(upload);
    return (
        <div>
        <div style={{marginTop:"10px"}}>
            <Button color="danger" onClick={toggle} size="lg" style = {props.buttonStyle}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className} >
                <ModalHeader toggle={toggle}>Upload Form</ModalHeader>
                <ModalBody>
                    <Form style={{marginBottom:"20px",fontSize:"17px"}}>
                        <FormGroup>
                            <Label for="topic">Topic</Label>
                            <Input type="text" name="topic" id="topic" placeholder="Enter a topic" size="lg" onChange={changeField}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="desc">Brief description</Label>
                            <Input type="textarea" name="description" id="desc" size="lg" onChange={changeField}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="file">File</Label>
                            <Input type="file" name="pdf" id="file"/>
                        </FormGroup>
                    </Form>   
                </ModalBody>
                <ModalFooter >
                    <Button color="primary" size="lg" onClick={submitData}>Upload</Button>{' '}
                    <Button color="secondary" onClick={toggle} size="lg">Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
        <div>Discussion Forum</div>
        </div>
    );
}

export default UploadModal;