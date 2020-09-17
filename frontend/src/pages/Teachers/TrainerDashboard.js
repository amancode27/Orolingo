import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import basename from "./../Home/basename.js";
import axios from "axios";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Jumbotron,
  Button,
  Row,
  Col,
  Container,
} from "reactstrap";
import { ListGroup, ListGroupItem } from 'reactstrap';

import CarouselTop from "../Home/Carousel.js"

import DropDown from "../Students/Dropdown.js";
import { Chip } from "@material-ui/core";
import { Link} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
//import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { mainListItems, secondaryListItems } from './listItems';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const TrainerDashboard = (props) => {
  const buttonStyle = {
    width:"100px",
    fontSize:"10px",
    fontFamily: "sans-serif",
    height:"35px",
    marginLeft:"auto",
    marginRight:"auto",
    borderRadius:"10px",
    marginTop:"10px"
  };
  const [trainerName,setTrainerName] = useState("")
  const [upcomingCourses,setUpcomingCourses] = useState([]);
  const [liveCourses,setLiveCourses] = useState([]);
  const [languages,setLanguages] = useState({});
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
      height: 200,
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      fontWeight: theme.typography.fontWeightRegular,
    },
  }));
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


  useEffect(()=>{
    axios
    .get(`${basename}/api/course/?trainer=${props.userId}`)
    .then((res) => {
        //console.log(res.data.objects);
        const tmp = res.data.objects;
        setLiveCourses([]); setUpcomingCourses([]);
        tmp.map(k=>{
          const startdate = Date.parse(k.startdate);
          const enddate = Date.parse(k.enddate);
          const curdate = Date.now();
          setTrainerName(k.trainer.user.fullname);
          setLanguages(prev=>{
            return {...prev,[k.language.name]:k.language.id};
          })
          if(curdate>=startdate&&curdate<=enddate){
            setLiveCourses(prev=>{
              return [...prev,k];
            })
          }
          else if(curdate<startdate){
            setUpcomingCourses(prev=>{
              return [...prev,k];
            })
          }
        });
    });
  },[props]);


  return (
    <div>
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
      <Jumbotron>
         <Grid>
          <Grid item xs={12}>
          <h1 className="display-2">
            Hello! {trainerName} 
          </h1>
          </Grid>
          <hr className="my-2" />
          <Grid item xs={12}>
          <img src="https://source.unsplash.com/200x200/?man" height = "200"/> 
          </Grid>
        </Grid>
      </Jumbotron>
        <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={fixedHeightPaper}>             
              <CardTitle className="text-center" style={{fontSize:"20px"}}>Languages You Teach</CardTitle>
                    <ListGroup style={{marginTop:"20px",marginBottom:"20px",fontSize:"15px",textAlign:"center"}} size="lg">
                      {Object.keys(languages).map(k=>(
                        <Link style={{textDecoration:"none",}} to={`dashboard/trainercourses/${k}`}>
                          <ListGroupItem>{k}</ListGroupItem>
                        </Link>
                      ))}
                      
                    </ListGroup>              
              </Paper>
            </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Paper >
                  <CardTitle className="text-center" style={{fontSize:"20px"}}>Your Courses</CardTitle>
                  <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls = "panel1a-content"
                    id="panel1a-header"
                  >
                  <CardTitle className="text-center" style={{fontSize:"20px"}}>Live Courses</CardTitle>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Row>
                    {liveCourses.map((e) => (
                      <div>
                        <Col>
                            <Card>
                            <CardBody>
                              <CardTitle>{e.name}</CardTitle>
                              <CardText>Start-Date :{e.startdate}<br/>End Date: {e.enddate} </CardText>
                              
                              <div className="text-center mt-3">
                              <Link to={`/dashboard/trainercourses/uploads/${e.id}`}>
                                <Button color="success" style={{width:"100px"}}>Upload Content</Button>
                              </Link> 
                              </div>
                              <div className="text-center mt-3">
                              <Link to={`/dashboard/chatapp/${e.id}`}>
                                <Button color = "success" style={{width:"100px"}}>Chat App</Button>
                              </Link> 
                              </div>
                              <div className="text-center mt-3">
                              <Link to={`dashboard/editcourse/${e.id}`}>
                                <Button color="success" style={{width:"100px"}}>Edit</Button>
                              </Link>  
                              </div>

                            </CardBody>
                          </Card>
                            </Col>
                      </div>
                    ))}
                    </Row>
                  </AccordionDetails>
                  </Accordion>
                  <Accordion>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel2a-content"
                      id="panel2a-header"
                    >
                  <CardTitle className="text-center" style={{fontSize:"20px"}}>Upcoming Courses</CardTitle>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Row>
                    {upcomingCourses.map((e) => (
                      <div>
                        <Col>
                          <Card body>
                          <CardBody>
                            <CardTitle>{e.name}</CardTitle>
                            <CardText>Start-Date :{e.startdate}<br/>End Date: {e.enddate} </CardText>
                            
                            <div className="text-center mt-3">
                            <Link to={`/dashboard/trainercourses/uploads/${e.id}`}>
                              <Button color="success" style={{width:"100px"}}>Upload Content</Button>
                            </Link> 
                            </div>
                            <div className="text-center mt-3">
                            <Link to={`/dashboard/chatapp/${e.id}`}>
                              <Button color = "success" style={{width:"100px"}}>Chat App</Button>
                            </Link> 
                            </div>
                            <div className="text-center mt-3">
                            <Link to={`dashboard/editcourse/${e.id}`}>
                              <Button color="success" style={{width:"100px"}}>Edit</Button>
                            </Link>  
                            </div>

                          </CardBody>
                          </Card>
                        </Col>
                        
                      </div>
                    ))}
                    </Row>
                    
                      <Link to="dashboard/createcourse" style={{marginLeft:"auto",marginRight:"auto"}}>
                          <Button style ={buttonStyle} color="primary" size="lg">Upload Course</Button>
                        </Link>
                      
                  </AccordionDetails>      
                  </Accordion>
                  </Paper>
                </Grid>
              </Grid> 
            </Container> 
          </div>
          </div>
  );
};

TrainerDashboard.propTypes = {};

export default TrainerDashboard;

