import React,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import basename from "../Home/basename.js";
import FeedbackModal from './ModalForFeedback'
import axios from "axios";
import {
    CardTitle,
    CardText,
    Row,
    Col,
    Jumbotron,
  } from "reactstrap";
import * as timeago from 'timeago.js';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mainListItems } from './listItems';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { mdiAccountVoice } from '@mdi/js';
import Icon from '@mdi/react';
import TextField from '@material-ui/core/TextField';
import useFullPageLoader from '../../Components/FullPageLoader/useFullPageLoader.js';

const CourseContent = (props,user) =>{
    
      const student_course_id = props.match.params['id'];
      const preventDefault = (event) => event.preventDefault();
      console.log(props.match.params["course"]);

      const [loader, showLoader, hideLoader] = useFullPageLoader();
      const [courseName, setCourseName] = useState("");
      const [forumData, setForumData] = useState([]);
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const [open, setOpen ] =useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  const drawerWidth = 150;

      const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
        },
        toolbar: {
          paddingRight: 24, // keep right padding when drawer closed
        },
        openIcon : {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          ...theme.mixins.toolbar,
        },
        toolbarIcon: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 8px',
          ...theme.mixins.toolbar,
        },
        appBar: {
          zIndex: theme.zIndex.drawer + 1,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        },
        appBarShift: {
          marginLeft: '150%',
          width: `calc(100% - 150px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        menuButton: {
          marginRight: 5,
        },
        menuButtonHidden: {
          display: 'none',
        },
        title: {
          flexGrow: 1,
        },
        drawerPaper: {
          position: 'relative',
          whiteSpace: 'nowrap',
          width: '240px',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        drawerPaperClose: {
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width: theme.spacing(7),
          [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
          },
        },
        appBarSpacer: theme.mixins.toolbar,
        content: {
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        },
        container: {
          paddingTop: theme.spacing(4),
          paddingBottom: theme.spacing(4),
        },
        paper: {
          padding: theme.spacing(2),
          display: 'flex',
          overflow: 'auto',
          flexDirection: 'column',
        },
        fixedHeight: {
          height: 240,
        },
        heading: {
          fontSize: theme.typography.pxToRem(15),
          fontWeight: theme.typography.fontWeightRegular,
        },
        
        media: {
          height: 140,
        },
        discuss : {
          '& > *': {
            margin: theme.spacing(1),
            width: '25ch',
          },
        },
      }));

      const classes = useStyles();
      const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

      const changeTitle = (e) => {
          setTitle(e.target.value);
          
      }

      const changeDescription = (e) => {
            setDescription(e.target.value);
      }
      const discuss = (e) => {
        e.preventDefault();
        showLoader();
        axios.get(`${basename}/api/student_course/${student_course_id}`)
             .then(res=>{
               hideLoader();
                axios.post(`${basename}/auth/api/forum/create/`,{
                  "title" : title,
                  "description" : description,
                  "creator": props.username,
                  "student_course": res.data.id,
                  "student" : props.userId
                })
                .then((res) => {
                  axios.get(`${basename}/auth/api/forum?student_course=${student_course_id}`)
                  .then((res) => {
                  setForumData(res.data); 
                })});
             })
        setTitle("");
        setDescription("");
      }

    useEffect(() => {
      showLoader();       
      axios.
      get(`${basename}/auth/api/forum?student_course=${student_course_id}`)
      .then((res) => {
        hideLoader();
        const tmp = res.data.objects;
        setForumData(res.data); 
      });

      axios.get(`${basename}/api/student_course/${student_course_id}`)
      .then((res) =>{
        setCourseName(res.data.course.name);
      });

    },[props] );

    //console.log(forumData);
    return (
        
        <div className={classes.root}>
          <CssBaseline/>
          <Drawer
            variant="permanent"
            classes={{
              paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
            }}
            open={open}
          >
            <div className={classes.toolbarIcon}>
              <IconButton onClick={handleDrawerClose} className={clsx(classes.menuButton, !open && classes.menuButtonHidden)}>
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
            <Divider />
            <List>{mainListItems}</List>
            <Divider />
          </Drawer>
          <React.Fragment className={classes.content}>
          
          <Container className = "mt-5">
          <Grid>
            <Grid item xs={12}>
              <h1 className="display-2 text-center">
              {courseName} 
              </h1>
              <hr/>
            </Grid>
          </Grid>
            <Grid container spacing = {3}>
              <Grid item xs={12} md={6} lg={6}>
              <CardActionArea>
              <Card className={classes.paper} style={{fontSize : "13px"}}>
                  <Link to={`${student_course_id}/assignments`} style={{textDecoration : "none", color: "black"}}>
                    <CardMedia
                      className={classes.media}
                      image="https://source.unsplash.com/318x180"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Your Assignments
                      </Typography>
                      <Typography variant="body1" color="textSecondary" component="p">
                        Your Course Assignments are available here !
                      </Typography>
                    </CardContent>
                  </Link>
                </Card>  
                </CardActionArea>
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
              <CardActionArea>
              <Card className={classes.paper} style={{fontSize : "13px"}}>
              <Link to={`${student_course_id}/notes`} style={{textDecoration : "none", color: "black"}}>
                    <CardMedia
                      className={classes.media}
                      image="https://source.unsplash.com/318x180"
                      title="dvsdv"
                    />
                    <CardContent >
                      <Typography gutterBottom variant="h5" component="h2">
                        Your Notes
                      </Typography>
                      <Typography variant="body1" color="textSecondary" component="p">
                        Your Notes are available here !
                      </Typography>
                    </CardContent>
                  </Link>               
                </Card>
                </CardActionArea>
              </Grid>
            </Grid>
            <Grid container spacing = {3}>
              <Grid item xs={12}>
              <Card className={classes.paper}>
                  <Typography gutterBottom variant="h5" component="h2">
                      Live video lectures, Recorded videos, etc here.
                  </Typography>
                  <FeedbackModal {...props} buttonLabel = {"Give Feedback"} className = {"feedback"} />
              </Card>
              </Grid>
            </Grid>

          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper>
                <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls = "panel1a-content"
                    id="panel1a-header"
                  >
                  <CardTitle className="text-center mt-3" style={{fontSize:"20px"}}>Discussion Forum </CardTitle>
                  </AccordionSummary>
              <AccordionDetails>
                <Row>
              <Col md={10}>
                <div className="commentList">
                    {forumData.map(k => (
                      <Card variant="outlined" elevation={3}>
                        <CardActionArea>
                  
                        {/* <img
                        className="mr-3 bg-light rounded"
                        width="48"
                        height="48"
                        src={`https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg`}
                        alt="Avatar"
                        /> */} 
                        <Row>
                          <Col md={1} >
                            <Icon style={{padding : "10px"}} path = {mdiAccountVoice} size={4} />
                        </Col>
                        <Col md={11}>
                        <CardContent>
                          <Typography gutterBottom variant="h5" component="h2">
                          { k.creator } 
                          </Typography>
                          <Typography gutterBottom variant="h6" component="h2">
                          { k.title }
                          </Typography>
                          <Typography variant="subtitle1">
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
                </div>
              </Col>
              <Col md={2}>
              <form className={classes.discuss} style={{fontSize : "25px", color :"black"}} noValidate autoComplete="off">
                <TextField id="standard-basic" label="Title" onChange = {changeTitle} value = {title} /> <br/>
                <TextField id="outlined-basic" label="Description" variant="outlined" onChange = {changeDescription} multiline value = {description} />
                <Button variant="contained" color="primary" onClick = {discuss}>
                  Discuss &#10148;
                </Button>
              </form>
              </Col>
              </Row>
              </AccordionDetails>
          </Accordion>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        {loader}
        </React.Fragment>
        </div>
    );

}
export default CourseContent;