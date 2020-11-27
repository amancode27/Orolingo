
import React, { useState, useEffect } from 'react'
import basename from "../Home/basename.js";
import axios from "axios";  
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import UploadModal from './UploadModal.js';
import useFullPageLoader from '../../Components/FullPageLoader/useFullPageLoader.js';
import Fab from '@material-ui/core/Fab';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import WifiTetheringIcon from '@material-ui/icons/WifiTethering';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import ReactPlayer from 'react-player';


const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        //height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    fab: {
        margin: theme.spacing(2),
      },

    absolute: {
        position: 'fixed',
        bottom: theme.spacing(2),
        right: theme.spacing(3),
      },
}));

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Page = (props) => {
    const classes = useStyles();
    const [assignment, setAssignment] = useState([]);
    const [notes, setNotes] = useState([]);
    const [videos, setVideos] = useState([]);
    const [lectures, setLectures] = useState([]);
    const [feedback, setFeedback] = useState([]);
    const [courseName, setCourseName] = useState("");
    let course_id;
    const student_course_id = props.match.params['id'];
    const [loader,showLoader,hideLoader] = useFullPageLoader();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        showLoader();
        const course_id = props.match.params['id'];
        axios.get(`${basename}/api/course/${course_id}`)
        .then(res => {
            setCourseName(res.data.name);
        })

        axios.get(`${basename}/api/assignments/?course=${course_id}`)
            .then(res => {
                hideLoader();
                const a = res.data.objects;
                a.map(k => {
                    const tmp = {};
                    tmp['id'] = k.id;
                    tmp['topic'] = k.topic;
                    tmp['description'] = k.description;
                    tmp['created_at'] = k.created_at;
                    tmp['pdf'] = k.pdf;
                    tmp['deadline'] = k.deadline;
                    setAssignment(prev => {
                        return [...prev, tmp];
                    })
                });
            })
        axios.get(`${basename}/api/note/?course=${course_id}`)
            .then(res => {
                const a = res.data.objects;
                a.map(k => {
                    const tmp = {};
                    tmp['id'] = k.id;
                    tmp['topic'] = k.topic;
                    tmp['description'] = k.description;
                    tmp['created_at'] = k.created_at;
                    tmp['pdf'] = k.pdf;
                    setNotes(prev => {
                        return [...prev, tmp];
                    })
                });
            })
        
        axios.get(`${basename}/api/videos/?course=${course_id}`)
            .then(res => {
                const a = res.data.objects;
                a.map(k => {
                    const tmp = {};
                    tmp['id'] = k.id;
                    tmp['topic'] = k.topic;
                    tmp['description'] = k.description;
                    tmp['created_at'] = k.created_at;
                    tmp['pdf'] = k.pdf;
                    setVideos(prev => {
                        return [...prev, tmp];
                    })
                });
            })
        
        axios.get(`${basename}/api/feedback/?course=${course_id}`)
            .then(res => {
                const tmp1 = res.data.objects;
                tmp1.map(k => {
                    const tmp = {};
                    console.log(k);
                    tmp['rating'] = k['rating'];
                    tmp['body'] = k['body'];
                    axios.get(`${basename}${k['student']}`)
                        .then(res1 => {
                            console.log(res1);
                            tmp['fullname'] = res1.data.user['fullname'];
                            setFeedback(prev => {
                                return [...prev, tmp];
                            });
                        })
                })
            })
    }, [props.match.params['id']])

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

    const deleteVideo = (id) =>{
        axios.delete(`${basename}/api/videos/${id}/`);
        setVideos(prev=>prev.filter(e=>{
            return e.id!=id;
        }))
    }    


    console.log(props)
    return (
        <React.Fragment>
            <CssBaseline />
            <main>
                {/* Hero unit */}
                <div className={classes.heroContent}>
                    <Container maxWidth="sm">
                        <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                            {courseName}
                        </Typography>
                        <Typography variant="h5" align="center" color="textSecondary" paragraph>
                            A One go to page for managing your uploads.
                        </Typography>
                        {/* <div className={classes.heroButtons}>
                            <Grid container spacing={2} justify="center">
                                <Grid item>
                                    <Button variant="contained" color="primary">
                                        Show Completed
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button variant="outlined" color="primary">
                                        Search
                                </Button>
                                </Grid>
                            </Grid>
                        </div> */}
                    </Container>
                </div>
                
                <Container className={classes.cardGrid} maxWidth="lg">
                    {/* End hero unit */}
                    <Grid container spacing={4} >
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        Assignments
                                    </Typography>
                                    {/* <Button variant="contained" color="primary">
                                        Upload
                                    </Button> */}
                                    <UploadModal {...props} {...{'content':'assignments'}} buttonLabel = {"Upload Assignments"} className = {"assignments"} />
                                </CardContent>
                            </Card>
                            {assignment.map((e) => (
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random?book"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h4" component="h2">
                                            {e['topic']}
                                        </Typography>
                                        <Typography>
                                            {e['description']}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    <Button size="large" variant="outlined" color="primary">
                                        <a href={`http://localhost:8000${e['pdf']}`} target='blank'>
                                        Download
                                        </a>
                                    </Button>
                                        <Button size="large" variant="outlined" color="primary" onClick={()=>deleteAssignment(e.id)}>
                                            Delete
                                        </Button>
                                        <Button size="large" color="primary">
                                            Deadline : {e['deadline']}
                                        </Button>
                                        <Dialog
                                            open={open}
                                            onClose={handleClose}
                                            aria-labelledby="alert-dialog-title"
                                            aria-describedby="alert-dialog-description"
                                        >
                                            <DialogTitle id="alert-dialog-title">{"Are you sure? "}</DialogTitle>
                                            <DialogContent>
                                            <DialogContentText id="alert-dialog-description">
                                                If once this assignment is deleted it will not be visible to the student.
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                            <Button onClick={handleClose} color="secondary">
                                                Yes, I am Sure
                                            </Button>
                                            <Button onClick={handleClose} color="primary" autoFocus>
                                                No
                                            </Button>
                                            </DialogActions>
                                        </Dialog>

                                    </CardActions>
                                </Card>
                            ))}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        Videos
                                    </Typography>
                                    {/* <Button variant="contained" color="primary">
                                        Upload
                                    </Button> */}
                                    <UploadModal {...props} {...{'content':'videos'}} buttonLabel = {"Upload Videos"} className = {"feedback"} />
                                </CardContent>
                                {videos.map((e) => (
                                <Card className={classes.card}>
                                    <ReactPlayer
                                        className='react-player'
                                        url= {`http://localhost:8000${e['pdf']}`}
                                        width='100%'
                                        height='100%'
                                        controls
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h4" component="h2">
                                            {e['topic']}
                                        </Typography>
                                        <Typography>
                                            {e['description']}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    <Button size="large" variant="outlined" color="primary">
                                        <a href={`http://localhost:8000${e['pdf']}`} target='blank'>
                                        Download
                                        </a>
                                    </Button>
                                        <Button size="large" variant="outlined" color="primary" onClick={()=>deleteVideo(e.id)}>
                                            Delete
                                        </Button>
                                        <Button size="large"  color="primary">
                                            Created At : {e['created_at']}
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                            </Card> 

                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardContent>
                                    <Typography gutterBottom variant="h4" component="h2">
                                        Notes
                                    </Typography>
                                    {/* <Button variant="contained" color="primary">
                                        Upload
                                    </Button> */}
                                    <UploadModal {...props} {...{'content':'note'}} buttonLabel = {"Upload Notes"} className = {"feedback"} />
                                </CardContent>
                            </Card>
                            {notes.map((e) => (
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random?book"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h4" component="h2">
                                            {e['topic']}
                                        </Typography>
                                        <Typography>
                                            {e['description']}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button size="large" variant="outlined" color="primary">
                                            <a href={`http://localhost:8000${e['pdf']}`} target='blank'>
                                            Download
                                            </a>
                                        </Button>
                                        <Button size="large" variant="outlined" color="primary" onClick={()=>deleteNote(e.id)}>
                                            Delete
                                        </Button>
                                        <Button size="large"  color="primary">
                                            Created At : {e['created_at']}
                                        </Button>
                                    </CardActions>
                                </Card>
                            ))}
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            
                        </Grid>
                    </Grid>
                </Container>
                <Tooltip title="Go Live" aria-label="add">
                    <Fab color="primary" className={classes.absolute}>
                        <WifiTetheringIcon style = {{ fontSize : 40 }}/>
                    </Fab>
                </Tooltip>
            </main>
            {/* Footer */}
        {loader}
        </React.Fragment>
    );
}

export default Page