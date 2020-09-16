import React,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom'
import basename from "../Home/basename.js";
import FeedbackModal from './ModalForFeedback'
import axios from "axios";
import {
    CardTitle,
    CardText,
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
import { mainListItems, secondaryListItems } from './listItems';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';

const CourseContent = (props,user) =>{
    
      const student_course_id = props.match.params['id'];
      const preventDefault = (event) => event.preventDefault();
      console.log(props.match.params["course"]);

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

  const drawerWidth = 240;

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
          marginLeft: drawerWidth,
          width: `calc(100% - ${drawerWidth}px)`,
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        menuButton: {
          marginRight: 36,
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
          width: drawerWidth,
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
        axios.get(`${basename}/api/student_course/${student_course_id}`)
             .then(res=>{
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
      axios.
      get(`${basename}/auth/api/forum?student_course=${student_course_id}`)
      .then((res) => {
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
              <IconButton onClick={handleDrawerClose}>
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
            <List>{secondaryListItems}</List>
          </Drawer>
          <React.Fragment className={classes.content}>
          <Jumbotron>
          <Grid>
            <Grid item xs={12}>
              <h1 className="display-2">
              {courseName} 
              </h1>
            </Grid>
              <hr className="my-2" />
            <Grid item xs={12}>
              <img src="https://source.unsplash.com/200x200/?language" height = "200"/> 
            </Grid>
          </Grid>
          </Jumbotron>
          <Container className = "mt-5">
            <Grid container spacing = {3}>
              <Grid item xs={12} md={6} lg={6}>
              <Card className={classes.paper}>
                  <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://source.unsplash.com/318x180"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Your Assignments
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Your Course Assignments are available here !
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                  <Link to={`${student_course_id}/assignments`}>
                    <Button size="small" color="primary" variant="contained">
                      Your Assignments
                    </Button>
                  </Link>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>  
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
              <Card className={classes.paper}>
              <CardActionArea>
                    <CardMedia
                      className={classes.media}
                      image="https://source.unsplash.com/318x180"
                      title="Contemplative Reptile"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        Your Notes
                      </Typography>
                      <Typography variant="body2" color="textSecondary" component="p">
                        Your Notes are available here !
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                  <Link to={`${student_course_id}/notes`}>
                    <Button size="small" color="primary" variant="contained">
                      Your Notes
                    </Button>
                  </Link>
                    <Button size="small" color="primary">
                      Learn More
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing = {3}>
              <Grid item xs={12}>
              <Card className={classes.paper}>
                  <Typography gutterBottom variant="h5" component="h2">
                      Live video lectures, Recorded videos, etc here.
                  </Typography>
              </Card>
              </Grid>
            </Grid>
            <Grid container spacing = {3}>
              <Grid item xs={12}>
              <Paper className={classes.paper}>
                  <FeedbackModal {...props} buttonLabel = {"Give Feedback"} className = {"feedback"} />
              </Paper>
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
              <Col md={8}>
                <div className="commentList">
                    {forumData.map(k => (

                        <div className="media mb-3">
                        <img
                        className="mr-3 bg-light rounded"
                        width="48"
                        height="48"
                        src={`https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg`}
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
              </Col>
              <Col md={4}>
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
              </Col>
              </AccordionDetails>
          </Accordion>
              </Paper>
            </Grid>
          </Grid>
        </Container>
        </React.Fragment>
        </div>
    );

}
export default CourseContent;