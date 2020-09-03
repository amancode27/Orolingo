import React, { useState, useEffect } from "react";
import basename from "./../Home/basename.js";
import axios from "axios";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
  Container,
  
} from "reactstrap";
import { ListGroup, ListGroupItem } from 'reactstrap';

import DropDown from "../Students/Dropdown.js";
import { Chip } from "@material-ui/core";
import { Link} from "react-router-dom";
import * as timeago from 'timeago.js';


const ChatApp = (props) => {

    const id = props.match.params["id"];
    let selstd;
    const [anselstd, setanselstd] = useState(""); 
    const [students, setStudents] = useState([]);
    const [forumData, setForumData] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const changeTitle = (e) => {
        setTitle(e.target.value);
        
    }

    const changeDescription = (e) => {
        setDescription(e.target.value);
    }

    const display = (val) => {
        selstd = val;
        setanselstd(val);
        setForumData([]);
        axios.get(`${basename}/api/student_course/?course=${id}&student=${selstd}`)
        .then((res) => {
            //console.log(res.data);
            res.data.objects.map(k => {
                axios.get(`${basename}/auth/api/forum?student_course=${k.id}`)
                .then((res1) => 
                res1.data.map( k => {
                    setForumData(prev => {
                        return [...prev,k]
                    })
                })
                )
            })
        });

    }

    const discuss = (e) => {
        e.preventDefault();
        axios.get(`${basename}/api/student_course/?course=${id}&student=${anselstd}`)
                .then(res=>{
                    //console.log(res.data)
                axios.post(`${basename}/auth/api/forum/create/`,{
                    "title" : title,
                    "description" : description,
                    "creator": props.username,
                    "student_course": res.data.objects[0].id,
                    "trainer" : props.userId
                })
                .then((res) => {
                    setForumData([]);
                    axios.get(`${basename}/api/student_course/?course=${id}&student=${anselstd}`)
                    .then((res) => {
                        //console.log(res.data);
                        res.data.objects.map(k => {
                            axios.get(`${basename}/auth/api/forum?student_course=${k.id}`)
                            .then((res1) => 
                            res1.data.map( k => {
                                setForumData(prev => {
                                    return [...prev,k]
                                })
                            })
                            )
                        })
                    });    
                });
                })
        setTitle("");
        setDescription("");
    }

    

    useEffect(() => {
        axios.get(`${basename}/api/student_course/?course=${id}`)
        .then((res) => {
            //console.log(res.data);
            res.data.objects.map(k => {
                axios.get(`${basename}${k.student}`)
                .then(res1 => {
                    setStudents(prev => {
                        return [...prev,res1.data];
                    })
                })
            })
        });
    },[props.match.params["id"]]);

    //console.log(students);
    //console.log(selstd);
    return (
        <div>
            <Container>
            <Row>
                <Col md="4">
                    {students.map(k => (
                        <Card body className="text-center mt-3 mr-3" onClick={() => display(k.user.id)}>
                            {k.user.fullname}
                        </Card>
                    ))}
                </Col>
                <Col md = "8">
                <Card className="mt-3">
                    <CardTitle className="text-center mt-3" >Discussion Forum </CardTitle>
                    <Row>
                    <Col md="4">
                        <Card body>
                        <form >
                            <div className="form-group">
                            <input
                                className="form-control"
                                placeholder="Title"
                                name="Title"
                                type="text"
                                onChange = {changeTitle}
                                value = {title}
                            />
                            </div>

                            <div className="form-group">
                            <textarea
                                className="form-control"
                                placeholder="Details (200 letters)"
                                name="Description"
                                rows="5"
                                onChange = {changeDescription}
                                value = {description}
                            />
                            </div>


                            <div className="form-group">
                            <button  className="btn btn-primary" onClick={discuss}>
                                Discuss &#10148;
                            </button>
                            </div>
                        </form>
                    </Card>        
                    </Col>
                    <Col md="8">
                        <Card body>
                        <div className="commentList">
                            {forumData.map(k => (

                                <div className="media mb-3">
                                <img
                                className="mr-3 bg-light rounded"
                                width="48"
                                height="48"
                                src={`https://api.adorable.io/avatars/48/abott@adorable.png`}
                                alt="Avatar"
                                />

                                <div className="media-body p-2 shadow-sm rounded bg-light border">
                                <p className="float-right text-muted">{timeago.format(k.created_at)} </p>
                                <h4 className = "mt-0 mb-1 text-muted">{ k.creator } </h4>
                                <h6 className="mt-1 mb-1 text-muted">{ k.title }</h6>
                                {k.description}
                                </div>
                                </div>

                            ))}     
                        </div>
                        </Card>
                    </Col>
                    </Row>
                    </Card>
                </Col>
            </Row>
            </Container>
            
        </div>
    )

}

export default ChatApp;
