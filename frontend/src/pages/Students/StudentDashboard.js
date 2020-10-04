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
import CardActionArea from '@material-ui/core/CardActionArea';
import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import { blue } from '@material-ui/core/colors'; 
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import { mdiTrophyAward, mdiTrophyOutline } from '@mdi/js';
import Icon from '@mdi/react';
import useFullPageLoader from '../../Components/FullPageLoader/useFullPageLoader.js';
import { Slide } from 'react-awesome-reveal';
import LinearProgress from '@material-ui/core/LinearProgress';
import {mainListItems}  from './listItems';

const StudentDashboard = props => {
  const [languagesLearnt, setLanguagesLearnt] = useState({});
  const [languagesToLearn, setLanguagesToLearn] = useState({});
  const [liveCourses, setLiveCourses] = useState({});
  const [pastCourses,setPastCourses] = useState({});
  const [upcomingCourses,setUpcomingCourses] = useState({});
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
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Select a language");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = (value) => {
    setOpenDialog(false);
    setSelectedValue(value);
  };
  const [loader, showLoader, hideLoader] = useFullPageLoader();
  // const drawerWidth = [150,240];

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
          marginLeft: 150,
          width: `calc(100% - 240px)`,   
          // ${""}px
          transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
        menuButton: {
          marginRight: 10,
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
          width: "140%",
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
        avatar: {
          backgroundColor: blue[100],
          color: blue[600],
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

  function SimpleDialog(props) {

    const avatars = makeStyles({
    avatar: {
      backgroundColor: blue[100],
      color: blue[600],
      },
    });
    const classes = avatars();
    const { onClose, selectedValue, open } = props;
  
    const handleClose = () => {
      onClose(selectedValue);
    };
  
    const handleListItemClick = (e) => {
      onClose(e);
      console.log(e);
      setBuyCourse({[e]:availableLanguages[e]});
    };
  
    return (
      <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}  >
        <DialogTitle id="simple-dialog-title">Select a language </DialogTitle>
        <List name="select" id="buycourses" onChange = {(e)=>changeCourse(e)} style={{minWidth : "300px"}}>
            {Object.keys(availableLanguages).map((key,index)=>(
              <ListItem button onClick= {()=> handleListItemClick(key)}  key={key}>
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <AddIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={key} />
            </ListItem>
            ))}
        </List>
      </Dialog>
    );
  }

  useEffect(() => {
    showLoader();
    axios
      .get(`${basename}/api/student/${props.userId}/`)
      .then((res) => {
        hideLoader();
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
                k.completed_percent = parseInt(((curdate-startdate) / (enddate - startdate))*100);
                //console.log(;
                if(k.completed_percent >= 100){
                  k.completed_percent = 100;
                }
                if (k.completed_percent <= 0){
                  k.completed_percent = 0;
                }
                console.log(k.completed_percent);
                
                if(curdate>=startdate&&curdate<=enddate&&k.completed_percent!=100){
                  setLiveCourses(prev=>{
                    return {...prev,[k.id]:k};
                  })
                }
                else if(curdate>enddate&& k.completed_percent == 100){
                  setPastCourses(prev=>{
                    return {...prev,[k.id]:k};
                  })
                  setLanguagesLearnt(prev=>{
                    return {...prev,[k.course.name]:(k.course.id)};
                  })
                }
                else if(curdate<startdate&&k.completed_percent!=100){
                  setUpcomingCourses(prev=>{
                    return {...prev,[k.id]:k};
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
      
      // axios.get(`${basename}/api/student_course/?student=${props.userId}&completed_percent=100`)
      //      .then(res=>{
      //        const languageslearnt = res.data.objects;
      //        languageslearnt.map(k=>{
      //          setLanguagesLearnt(prev=>{
      //            return {...prev,[k.course.name]:(k.course.id)};
      //          })
      //        })
      //      })
  }, [props]);
  //console.log(studentName);

  console.log(liveCourses);
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
          <IconButton onClick={handleDrawerClose}
            className={clsx(classes.menuButton, (!open) &&classes.menuButtonHidden)}>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <ChevronRightIcon />
          </IconButton>
        </div>
        <Divider />
          <List>{mainListItems}</List>
        <Divider />
        <mainListItems/>
      </Drawer>
      <React.Fragment className={classes.content}>
      {/* <Jumbotron>
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
      </Jumbotron> */}
      <Container maxWidth="md" className={classes.container}>
        <Typography className="text-center" variant="h2" gutterBottom>
          Hello! {studentName} 
        </Typography>
        <hr/>
        <Grid container spacing = {3}>
            <Grid item xs={12} className="text-center">
              <Slide direction="down" >
                
              <Paper className={classes.paper} >
                <CardBody>
                    <CardTitle style={{padding: "2px", fontSize : "20px"}}>Courses Completed  
                    <Icon path={mdiTrophyAward}
                      title="Completed"
                      size={3}
                      horizontal
                      vertical
                      rotate={-180}
                      color="green"
                      />
                     </CardTitle>
                    <CardText>
                      <Container>
                      <Row>
                        {Object.keys(languagesLearnt).map((key, index) => (
                          <div>
                            <Col>
                              <Link to={`/dashboard/courses/coursecontent/${languagesLearnt[key]}`}>
                                <Chip color="primary" style={{fontSize : "13px", marginTop : "5px"}}  label={key} size="lg" clickable icon = {<Icon path = { mdiTrophyOutline} size = {2} color = "white" />}></Chip>
                              </Link>
                              
                            </Col>
                          </div>
                        ))}
                      </Row>
                      </Container>
                    </CardText>
                </CardBody>
              </Paper>
              </Slide>
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Slide direction = "left">
              <Paper className={fixedHeightPaper}>
                  <CardBody>
                    <CardTitle className="text-center" style={{fontSize : "20px" }}>Want to learn</CardTitle>
                      <Row>
                        {Object.keys(languagesToLearn).map((key, index) => (
                          <div>
                            <Col style={{marginTop : "5px"}}>
                              <Chip onDelete={()=>{deleteToLearnLanguage(key)}} style={{fontSize : "15px"}} label={key}></Chip>
                            </Col>
                          </div>
                        ))}
                      </Row>
                      </CardBody>
                      <div style={{float : "bottom"}}>
                <DropDown availLanguages = {availableLanguages} addToLearnLanguage={addToLearnLanguage}  /> </div>                
              </Paper>
              </Slide> 
            </Grid>

            <Grid item xs={12} md={6} lg={6}>
              <Slide direction = "right">
              <Paper className={fixedHeightPaper}>
                  <Form>
                  <FormGroup>
                    <div className="text-center">
                      <Typography variant="h4" className="text-center">Selected a language to buy a course <br/>
                      <Chip size="lg" color="primary" style={{float: "unset", fontSize : "15px", marginTop : "20px"}} label={selectedValue} onClick={handleClickOpen} clickable></Chip>
                      </Typography>
                      <SimpleDialog selectedValue={selectedValue} open={openDialog} onClose={handleClose} />
                        <Link style = {{float : "none"}} to={{pathname:`/dashboard/courses/${Object.keys(buyCourse)[0]}`,
                                  aboutProps:{
                                      language:buyCourse[Object.keys(buyCourse)[0]],
                                  }
                        }}
                        >
                          <Chip  variant="outlined" clickable color="primary" style={{ fontSize : "15px" , marginTop : "20px"}} label="View Course" size="lg"></Chip>
                        </Link>
                  </div>
                  </FormGroup>
                  </Form>
              </Paper>
              </Slide>
            </Grid>

        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Slide direction = "up">
            <Paper >
              <CardTitle className="text-center" style={{fontSize:"20px", padding : "10px"}}>Your Courses</CardTitle>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon/>}
                    aria-controls = "panel1a-content"
                    id="panel1a-header"
                  >
                  <CardTitle className="text-center" style={{fontSize:"20px"}}>Live Courses</CardTitle>
                  </AccordionSummary>
                  <AccordionDetails style= {{maxHeight : "500px", overflowY : "scroll"}} className="scrollbar">
                  <CardBody className="overflow">
                    {Object.keys(liveCourses).map((e,index) => (
                      <div style={{padding : "10px"}}>
                      <CardActionArea>
                      <Link to={`/dashboard/courses/coursecontent/${e}`} style={{textDecoration : "none", color : "black"}} >
                          <Card className={classes.root} style={{width : "100%",padding : "10px"}}>
                              <CardMedia
                                className={classes.cover}
                                image= {liveCourses[e].course.language.name + '.svg' }
                                title="Live from space album cover"
                              />
                                <CardContent style={{width: "100%"}}>
                                  <Typography component="h4" variant="h5">
                                  {liveCourses[e].course.name}
                                  </Typography>
                                  <Typography component="h5" variant="h6">
                                  {liveCourses[e].course.language.name}
                                  </Typography>
                                  <Typography variant="h6" color="textSecondary">
                                  Start-Date : {liveCourses[e].course.startdate}
                                  <Typography variant="h6" color="textSecondary" style={{float : "right"}} >
                                  End Date : {liveCourses[e].course.enddate}
                                  </Typography>
                                  </Typography>
                                <div className="">
                                  <div className="text-center">
                                    <Typography component="h5" variant="h5">
                                    {liveCourses[e].completed_percent}%
                                      </Typography>
                                     <LinearProgress variant="determinate" className="ml-2 mr-2" value={liveCourses[e].completed_percent} /> </div>
                                </div>
                                </CardContent>
                            </Card>
                          </Link>        
                    </CardActionArea>
                    </div>         
                    ))}
                    </CardBody>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                  >
                <CardTitle className="text-center" style={{fontSize:"20px"}}>Recorded Courses</CardTitle>                  </AccordionSummary>
                  <AccordionDetails style= {{maxHeight : "500px", overflowY : "scroll", scrollBehavior : "smooth"}} className="scrollbar" >
                  <CardBody className="overflow">
                    {Object.keys(pastCourses).map((e,index) => (
                      <div style={{padding : "10px"}}>
                      <CardActionArea>
                      <Link to={`/dashboard/courses/coursecontent/${e}`} style={{textDecoration : "none", color : "black"}} >
                          <Card className={classes.root} style={{width : "100%",padding : "10px"}}>
                              <CardMedia
                                className={classes.cover}
                                image= {pastCourses[e].course.language.name + '.svg' }
                                title="Live from space album cover"
                              />
                                <CardContent style={{width: "100%"}}>
                                  <Typography component="h4" variant="h5">
                                  {pastCourses[e].course.name}
                                  </Typography>
                                  <Typography component="h5" variant="h6">
                                  {pastCourses[e].course.language.name}
                                  </Typography>
                                  <Typography variant="h6" color="textSecondary">
                                  Start-Date : {pastCourses[e].course.startdate}
                                  <Typography variant="h6" color="textSecondary" style={{float : "right"}} >
                                  End Date : {pastCourses[e].course.enddate}
                                  </Typography>
                                  </Typography>
                                <div className="">
                                  <div className="text-center">
                                    <Typography component="h5" variant="h5">
                                    {pastCourses[e].completed_percent}%
                                      </Typography>
                                     <LinearProgress variant="determinate" className="ml-2 mr-2" value={pastCourses[e].completed_percent} /> </div>
                                </div>
                                </CardContent>
                            </Card>
                          </Link>        
                    </CardActionArea>
                    </div>    
                    ))}
                    </CardBody>
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
                  <AccordionDetails style= {{maxHeight : "500px", overflowY : "scroll"}} className="scrollbar" >
                  <CardBody className="overflow">
                    {Object.keys(upcomingCourses).map((e,index) => (
                      <div style={{padding : "10px"}}>
                      <CardActionArea>
                      <Link to={`/dashboard/courses/coursecontent/${e}`} style={{textDecoration : "none", color : "black"}} >
                          <Card className={classes.root} style={{width : "100%",padding : "10px"}}>
                              <CardMedia
                                className={classes.cover}
                                image= {upcomingCourses[e].course.language.name + '.svg' }
                                title="Live from space album cover"
                              />
                                <CardContent style={{width: "100%"}}>
                                  <Typography component="h4" variant="h5">
                                  {upcomingCourses[e].course.name}
                                  </Typography>
                                  <Typography variant="h6" color="textSecondary">
                                  Start-Date : {upcomingCourses[e].course.startdate}
                                  <Typography variant="h6" color="textSecondary" style={{float : "right"}} >
                                  End Date : {upcomingCourses[e].course.enddate}
                                  </Typography>
                                  </Typography>
                                <div className="">
                                  <div className="text-center">
                                    <Typography component="h5" variant="h5">
                                    {upcomingCourses[e].completed_percent}%
                                      </Typography>
                                     <LinearProgress variant="determinate" className="ml-2 mr-2" value={upcomingCourses[e].completed_percent} /> </div>
                                </div>
                                </CardContent>
                            </Card>
                          </Link>        
                    </CardActionArea>
                    </div>    
                    ))}
                  </CardBody>
                  </AccordionDetails>
                </Accordion>
                
                </Paper>
                </Slide>
          </Grid>
        </Grid>
        
        </Container>

        </React.Fragment>
          {loader}
      </div>
  )
}

StudentDashboard.propTypes = {

}

export default StudentDashboard