import React, { useState, useEffect } from 'react'
import basename from "./../Home/basename.js";
import axios from 'axios';
import { Link } from 'react-router-dom';
import DropDown from './Dropdown.js';
import { Form, FormGroup, Label, Input, Jumbotron} from 'reactstrap';
import {
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
  Button,
  Progress,
} from "reactstrap";
import Chip from '@material-ui/core/Chip';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
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
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import SkipPreviousIcon from '@material-ui/icons/SkipPrevious';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import SkipNextIcon from '@material-ui/icons/SkipNext';

const StudentDashboard = props => {
  const [languagesLearnt, setLanguagesLearnt] = useState({});
  const [languagesToLearn, setLanguagesToLearn] = useState({});
  const [liveCourses, setLiveCourses] = useState([]);
  const [pastCourses,setPastCourses] = useState([]);
  const [upcomingCourses,setUpcomingCourses] = useState([]);
  const [availableLanguages , setavailableLanguages] = useState({});
 // const [buyCourse,setBuyCourse] = useState("");
  const [forumData, setForumData] = useState({});
  const [buyCourse,setBuyCourse] = useState({});
  const [studentName,setStudentName] = useState("");
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
        details: {
          display: 'flex',
          flexDirection: 'column',
        },
        content: {
          flex: '1 0 auto',
        },
        cover: {
          width: 151,
        },
        controls: {
          display: 'flex',
          alignItems: 'center',
          paddingLeft: theme.spacing(1),
          paddingBottom: theme.spacing(1),
        },
        playIcon: {
          height: 38,
          width: 38,
        },
      }));

    const classes = useStyles();

    const theme = useTheme();


  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const changeCourse = (e) =>{
    if(e.target.value=="Select a language") setBuyCourse({});
    else{
      setBuyCourse({[e.target.value]:availableLanguages[e.target.value]});
    }
  }
  const addToLearnLanguage = (key,route) =>{
    if(!(key in languagesToLearn)){
        axios.get(`${basename}${route}`)
          .then(res=>{
            axios.get(`${basename}/api/student/${props.userId}/`)
                 .then(studentres=>{
                    axios.patch(`${basename}/api/student/${props.userId}/`,{
                      "languages_to_learn":[...(studentres.data.languages_to_learn),res.data],
                    });
                 });
          });
          setLanguagesToLearn((prevState) =>{return {...prevState,[key]:route}});
    }
  }

  const deleteToLearnLanguage = (key) =>{
      let tmp={};
      setLanguagesToLearn((prevState) =>{
        for(let k of Object.keys(prevState)){
          if(k == key) continue;
          tmp[k]=prevState[k];
        }
        return tmp;
      })
      axios.patch(`${basename}/api/student/${props.userId}/`,{
        "languages_to_learn":[],
      });
      Object.keys(languagesToLearn).map(k=>{
          let route = languagesToLearn[k];
          if(k!=key) {
            axios.get(`${basename}${route}`)
            .then(res=>{
              axios.get(`${basename}/api/student/${props.userId}/`)
                 .then(studentres=>{
                    axios.patch(`${basename}/api/student/${props.userId}/`,{
                      "languages_to_learn":[...(studentres.data.languages_to_learn),res.data],
                    });
                 });
            });
          }
      });
  }

  useEffect(() => {
    axios
      .get(`${basename}/api/student/${props.userId}/`)
      .then((res) => {
        const languagestolearn = res.data.languages_to_learn;
        setStudentName(res.data.user.fullname)
        languagestolearn.forEach((e) => {
          axios.get(`${basename}${e}`).then((res) =>
            setLanguagesToLearn((prev) => {
              return { ...prev, [res.data.name]: e };
            })
          );
        });
        axios
          .get(`${basename}/api/student_course/?student=${props.userId}`)
          .then((res) => {
              const tmp = res.data.objects;
              tmp.map(k=>{
                const startdate = Date.parse(k.course.startdate);
                const enddate = Date.parse(k.course.enddate);
                const curdate = Date.now();
                if(curdate>=startdate&&curdate<=enddate&&k.completed_percent!=100){
                  setLiveCourses(prev=>{
                    return [...prev,k];
                  })
                }
                else if(curdate>enddate&&k.completed_percent!=100){
                  setPastCourses(prev=>{
                    return [...prev,k];
                  })
                }
                else if(curdate<startdate&&k.completed_percent!=100){
                  setUpcomingCourses(prev=>{
                    return [...prev,k];
                  })
                }
              });
          });
      })
      .catch((error) => {
        console.log(error);
      });
      axios.get(`${basename}/api/language/`)
           .then((res)=>{
             console.log(res.data);
             const tmp = res.data.objects;
             tmp.map((k)=>{
                setavailableLanguages((prev)=>{
                  return {...prev,[k.name]:k.resource_uri};
                })
             });
           });


      
      
      axios.get(`${basename}/api/student_course/?student=${props.userId}&completed_percent=100`)
           .then(res=>{
             const languageslearnt = res.data.objects;
             languageslearnt.map(k=>{
               setLanguagesLearnt(prev=>{
                 return {...prev,[k.course.name]:(k.course.id)};
               })
             })
           })
  }, [props]);
  //console.log(studentName);

  
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
            Hello! {studentName} 
          </h1>
          </Grid>
          <hr className="my-2" />
          <Grid item xs={12}>
          <img src="https://source.unsplash.com/200x200/?student" height = "200"/> 
          </Grid>
        </Grid>
      </Jumbotron>
      <Container maxWidth="lg" className={classes.container}>
        <Grid container spacing = {3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                <CardBody>
                  <Row>
                    <CardTitle className="ml-3 mr-3">Courses Completed : </CardTitle>
                    <CardText>
                      <Row>
                        {Object.keys(languagesLearnt).map((key, index) => (
                          <div>
                            <Col>
                              <Link to={`/dashboard/courses/coursecontent/${languagesLearnt[key]}`}>
                                <Button color="success" > {key}</Button>
                                
                              </Link>
                            </Col>
                          </div>
                        ))}
                      </Row>
                    </CardText>
                  </Row>
                </CardBody>
              </Paper>
            </Grid>

            <Grid item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <CardBody>
                  <Row>
                    <CardTitle className="text-left mr-3 ml-3">Want to learn:</CardTitle>
                    <CardText>
                      <Row>
                        {Object.keys(languagesToLearn).map((key, index) => (
                          <div>
                            <Col>
                              <Chip onDelete={()=>{deleteToLearnLanguage(key)}} label={key}></Chip>
                            </Col>
                          </div>
                        ))}
                      </Row>
                    </CardText>
                  </Row>
                </CardBody>
                <DropDown availLanguages = {availableLanguages} addToLearnLanguage={addToLearnLanguage}/>
              </Paper>
            </Grid>

            <Grid item xs={12} md={8} lg={9}>
              <Paper className={fixedHeightPaper}>
                  
                  <Form>
                  <FormGroup>
                    <Label for="buycourses">Select a language to buy a course</Label>
                    <Input type="select" name="select" id="buycourses" onChange = {(e)=>changeCourse(e)} size="lg">
                      <option>Select a language</option>
                      {Object.keys(availableLanguages).map((key,index)=>(
                        <option>{key}</option>
                      ))}
                    </Input>
                  </FormGroup>
                  <Link to={{pathname:`/dashboard/courses/${Object.keys(buyCourse)[0]}`,
                            aboutProps:{
                                language:buyCourse[Object.keys(buyCourse)[0]],
                            }
                  }}
                  >
                    <Button size="lg">View Courses</Button>
                  </Link>
                  </Form>
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
                            <Card className={classes.root}>
                                <CardMedia
                                  className={classes.cover}
                                  image="https://source.unsplash.com/200x200/?study"
                                  title="Live from space album cover"
                                />
                                <div className={classes.details}>
                                  <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                    {e.course.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                    Start-Date : {e.course.startdate}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                    End Date : {e.course.enddate}
                                    </Typography>
                                  <div className="">
                                    <div className="text-center">
                                      <Typography component="h5" variant="h5">
                                      {e.completed_percent}%
                                        </Typography>
                                       <Progress className="ml-2 mr-2" value={e.completed_percent} /> </div>
                                  </div>
                                  <div className="mt-3">
                                    <Link to={`/dashboard/courses/coursecontent/${e.id}`}>
                                      <Button className="btn" color="success" style={{width:"100%"}}>Go</Button>
                                    </Link>
                                    </div>
                                  </CardContent>

                                </div>
                                
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
                <CardTitle className="text-center" style={{fontSize:"20px"}}>Recorded Courses</CardTitle>                  </AccordionSummary>
                  <AccordionDetails>
                  <Row>
                    {pastCourses.map((e) => (
                      <div>
                        <Col>
                        <Card className={classes.root}>
                                <CardMedia
                                  className={classes.cover}
                                  image="https://source.unsplash.com/200x200/?study"
                                  title="Live from space album cover"
                                />
                                <div className={classes.details}>
                                  <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                    {e.course.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                    Start-Date : {e.course.startdate}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                    End Date : {e.course.enddate}
                                    </Typography>
                                  <div className="">
                                    <div className="text-center">
                                      <Typography component="h5" variant="h5">
                                      {e.completed_percent}%
                                        </Typography>
                                       <Progress className="ml-2 mr-2" value={e.completed_percent} /> </div>
                                  </div>
                                  <div className="mt-3">
                                    <Link to={`/dashboard/courses/coursecontent/${e.id}`}>
                                      <Button className="btn" color="success" style={{width:"100%"}}>Go</Button>
                                    </Link>
                                    </div>
                                  </CardContent>

                                </div>
                                
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
                         <Card className={classes.root}>
                                <CardMedia
                                  className={classes.cover}
                                  image="https://source.unsplash.com/200x200/?study"
                                  title="Live from space album cover"
                                />
                                <div className={classes.details}>
                                  <CardContent className={classes.content}>
                                    <Typography component="h5" variant="h5">
                                    {e.course.name}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                    Start-Date : {e.course.startdate}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                    End Date : {e.course.enddate}
                                    </Typography>
                                  <div className="">
                                    <div className="text-center">
                                      <Typography component="h5" variant="h5">
                                      {e.completed_percent}%
                                        </Typography>
                                       <Progress className="ml-2 mr-2" value={e.completed_percent} /> </div>
                                  </div>
                                  <div className="mt-3">
                                    <Link to={`/dashboard/courses/coursecontent/${e.id}`}>
                                      <Button className="btn" color="success" style={{width:"100%"}}>Go</Button>
                                    </Link>
                                    </div>
                                  </CardContent>

                                </div>
                                
                              </Card>
                              
                              
                            </Col>
                      </div>
                    ))}
                  </Row>
                  </AccordionDetails>
                </Accordion>
                
                </Paper>
          </Grid>
        </Grid>
        
        </Container>

        </React.Fragment>
          
      </div>
  )
}

StudentDashboard.propTypes = {

}

export default StudentDashboard