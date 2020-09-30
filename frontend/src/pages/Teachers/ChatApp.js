import React, { useState, useEffect } from "react";
import basename from "./../Home/basename.js";
import axios from "axios";
import {
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
  Container,
  
} from "reactstrap";
import { makeStyles } from '@material-ui/core/styles';

import * as timeago from 'timeago.js';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { mdiAccountVoice, mdiDelete } from '@mdi/js';
import Icon from '@mdi/react';
import useFullPageLoader from '../../Components/FullPageLoader/useFullPageLoader.js';
import { Slide } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

const ChatApp = (props) => {

    const classes = useStyles();
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
    const [loader,showLoader,hideLoader] = useFullPageLoader();

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
        showLoader();
        axios.get(`${basename}/api/student_course/?course=${id}&student=${anselstd}`)
                .then(res=>{
                    //console.log(res.data)
                    hideLoader();
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

    const deleteF = (e) => {
        // e.preventDefault();
        let delId = e.id;
         console.log(delId);
           axios.delete(`${basename}/auth/api/forum/${delId}/delete`)
            .then((res) => {
                showLoader();
                setForumData([]);
                axios.get(`${basename}/api/student_course/?course=${id}&student=${anselstd}`)
                .then((res) => {
                    //console.log(res.data);
                    hideLoader();
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
        }
       
    

    useEffect(() => {
        showLoader();
        axios.get(`${basename}/api/student_course/?course=${id}`)
        .then((res) => {
            //console.log(res.data);
            hideLoader();
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
        <div style={{padding : "20px"}}>
            <Row>
                <Col md="4">
                
                    {students.map(k => (
                        <CardActionArea>
                        <Card className="text-center" style={{minHeight : "60px", padding : "20px"}} onClick={() => display(k.user.id)}>
                            {k.user.fullname}
                        </Card>
                        </CardActionArea>                      
                    ))}
                
                </Col>
                <Col md = "8">
                <Card>
                    <CardTitle className="text-center mt-3" style={{fontSize:"20px"}}>Discussion Forum </CardTitle>
                    <Row>
                    <Col md="4" style={{fontSize:"30px"}}>
                        
                        <form className={classes.discuss} style={{fontSize : "35px" ,color :"black", padding : "10px"}} noValidate autoComplete="off">
                            <TextField id="standard-basic" label="Title" onChange = {changeTitle} value = {title} style={{marginBottom : "10px",width : "100%"}}/> <br/>
                            <TextField id="outlined-basic" label="Description" rows={5} variant="outlined" onChange = {changeDescription} multiline value = {description} style={{width : "100%"}}/> <br/>
                            <Button variant="contained" color="primary" onClick = {discuss}>
                            Discuss &#10148;
                            </Button>
                        </form>
                       
                    </Col>
                    <Col md="8">
                    
                            {forumData.map(k => (
                                
                            <Card variant="outlined" elevation={3}>
                                <CardActionArea>
                                <Row>
                                <Col md={1} >
                                    <Icon style={{padding : "10px"}} path = {mdiAccountVoice} size={4} />
                                </Col>
                                <Col md={11}>
                                <CardContent>
                                <Typography gutterBottom variant="h4" component="h2">
                                { k.creator } 
                                <Icon style = {{padding : "10px", display : "flex", float : "right"}} path = { mdiDelete } size = {3} onClick= { () => deleteF(k) } />
                                </Typography>
                                <Typography gutterBottom variant="h5" component="h2">
                                { k.title } 
                                </Typography>
                                <Typography variant="h6">
                                {k.description}
                                </Typography>
                                <Typography variant="body1"  component="p" style={{float : "right"}}>
                                {timeago.format(k.created_at)}
                                </Typography>
                                </CardContent>
                                </Col>
                                </Row>
                                </CardActionArea>
                                </Card>
                            
                            ))} 
                    </Col>
                    </Row>
                    </Card>
                </Col>
            </Row>

            {loader}
        </div>
    )

}

export default ChatApp;
