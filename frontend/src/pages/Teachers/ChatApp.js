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
import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
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
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
  }));

  
const useStyles1 = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
}));

const ChatApp = (props) => {
    const [openDel, setOpenDel] = useState(false);

  const handleClickOpen = () => {
    setOpenDel(true);
  };

  const handleClose = () => {
    setOpenDel(false);
  };

    const classes = useStyles();
    const id = props.match.params["id"];
    let selstd;
    const [anselstd, setanselstd] = useState(""); 
    const [students, setStudents] = useState({});
    const [forumData, setForumData] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [chat_cnt,setChat_cnt]=useState(0);
    const changeTitle = (e) => {
        setTitle(e.target.value);
        
    }
    const [msgcnt,setMsgcnt] = useState([])

    const changeDescription = (e) => {
        setDescription(e.target.value);
    }
    const [loader,showLoader,hideLoader] = useFullPageLoader();

    const display = (val) => {
        setChat_cnt(prev=>prev+1);
        selstd = val;
        setanselstd(val);
        setForumData([]);
        axios.get(`${basename}/api/student_course/?course=${id}&student=${selstd}`)
        .then((res) => {
            //console.log(res.data);
            let cnt = res.data.forum_cnt;
            let student_course_id = res.data.objects[0].id;
            cnt=0;
            axios.patch(`${basename}/api/student_course/${student_course_id}/`,{
                "forum_cnt":cnt,
            });
            res.data.objects.map(k => {
                axios.get(`${basename}/auth/api/forum/?student_course=${k.id}`)
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
                            axios.get(`${basename}/auth/api/forum/?student_course=${k.id}`)
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
                    handleClose();
                    res.data.objects.map(k => {
                        axios.get(`${basename}/auth/api/forum/?student_course=${k.id}`)
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
                console.log(k);
                axios.get(`${basename}${k.student}`)
                .then(res1 => {
                    console.log(res1.data);
                    setStudents(prev => {
                        return {...prev,[res1.data.user.id]:{"student":res1.data,"cnt":k.forum_cnt}};
                    })
                })
            })
        });
    },[props.match.params['id'],chat_cnt]);

    const classes1 = useStyles();
    console.log(students);
    return (
        <div style={{padding : "20px"}}>
            <Row>
                <Col md="4" className="overflow">
                
                    {Object.keys(students).map((k,i) => (
                        <CardActionArea>
                        <Card className="text-center" style={{minHeight : "60px", padding : "20px"}} onClick={() => display(k)}>
                            {students[k].student.user.fullname}
                            
                            <div className={classes1.root}>
                                <Badge badgeContent={students[k].cnt} color="primary">
                                    <MailIcon />
                                </Badge>
                            </div>
                        </Card>
                        </CardActionArea>                      
                    ))}
                
                </Col>
                <Col md = "8">
                <Card>
                    <CardTitle className="text-center mt-3" style={{fontSize:"20px"}}>Discussion Forum </CardTitle>
                    <Row>
                    <Col md="4" style={{fontSize:"30px"}} >
                        
                        <form className={classes.discuss} style={{fontSize : "35px" ,color :"black", padding : "10px"}} noValidate autoComplete="off">
                            <TextField id="standard-basic" label="Title" onChange = {changeTitle} value = {title} style={{marginBottom : "10px",width : "110%"}}/> <br/>
                            <TextField id="outlined-basic" margin="none" label="Description" rows={5} variant="outlined" onChange = {changeDescription} multiline value = {description} style={{width : "100%"}} /> <br/>
                            <Button variant="contained" color="primary" onClick = {discuss} style={{marginTop : "10px"}}>
                            Discuss &#10148;
                            </Button>
                        </form>
                       
                    </Col>
                    <Col md="8" className="scrollbar">
                            <div className="overflow">
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
                                <Icon style = {{padding : "10px", display : "flex", float : "right"}} path = { mdiDelete } size = {3} onClick= { handleClickOpen } />
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
                                <Dialog
                                    open={openDel}
                                    onClose={handleClose}
                                    aria-labelledby="alert-dialog-title"
                                    aria-describedby="alert-dialog-description"
                                >
                                    <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
                                    <DialogContent>
                                    <DialogContentText id="alert-dialog-description">
                                        If you delete the message the student will not be able to see your message again.
                                    </DialogContentText>
                                    </DialogContent>
                                    <DialogActions>
                                    <Button onClick={() => deleteF(k)   } color="secondary" autoFocus>
                                        Yes, I am sure
                                    </Button>
                                    <Button onClick={handleClose} color="primary">
                                        No
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                                </CardContent>
                                </Col>
                                </Row>
                                </CardActionArea>
                                </Card>
                            
                            ))}
                        </div> 
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
