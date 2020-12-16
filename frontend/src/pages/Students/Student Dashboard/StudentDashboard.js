import React, { useState, useEffect } from 'react'
import basename from "../../Home/basename.js";
import axios from 'axios';
import { Link } from 'react-router-dom';
import DropDown from '../Dropdown.js';
import { Form, FormGroup} from 'reactstrap';
import { CardTitle, CardBody, CardText, Row, Col} from "reactstrap";
import Chip from '@material-ui/core/Chip';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import CardActionArea from '@material-ui/core/CardActionArea';
import Paper from '@material-ui/core/Paper';
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
import AddIcon from '@material-ui/icons/Add';
import { mdiTrophyAward, mdiTrophyOutline } from '@mdi/js';
import Icon from '@mdi/react';
import useFullPageLoader from '../../../Components/FullPageLoader/useFullPageLoader.js';
import { Slide } from 'react-awesome-reveal';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Drawer from './Drawer';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const StudentDashboard = props => {
  const [openS, setOpenS] = useState(true);
  const [languagesLearnt, setLanguagesLearnt] = useState({});
  const [languagesToLearn, setLanguagesToLearn] = useState({});
  const [liveCourses, setLiveCourses] = useState({});
  const [pastCourses,setPastCourses] = useState({});
  const [upcomingCourses,setUpcomingCourses] = useState({});
  const [availableLanguages , setavailableLanguages] = useState({});
  const [buyCourse,setBuyCourse] = useState({});
  const [studentName,setStudentName] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedValue, setSelectedValue] = useState("Select a language");

  const handleClickOpen = () => {
    setOpenDialog(true);
  };

  const handleClose = (value) => {
    setOpenDialog(false);
    setSelectedValue(value);
  };
  const handleCloseSnack = () => {
    setOpenS(false);
  }

  const [loader, showLoader, hideLoader] = useFullPageLoader();

      const useStyles = makeStyles((theme) => ({
        root: {
          display: 'flex',
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
        
      }));

    const classes = useStyles();
    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  const changeCourse = (e) =>{
    if(e.target.value === "Select a language") setBuyCourse({});
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
          if(k === key) continue;
          tmp[k]=prevState[k];
        }
        return tmp;
      })
      axios.patch(`${basename}/api/student/${props.userId}/`,{
        "languages_to_learn":[],
      });
      Object.keys(languagesToLearn).map(k=>{
          let route = languagesToLearn[k];
          if(k !== key) {
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
                
                if(curdate>=startdate && curdate<=enddate && k.completed_percent !== 100){
                  setLiveCourses(prev=>{
                    return {...prev,[k.id]:k};
                  })
                }
                else if(curdate>enddate&& k.completed_percent === 100){
                  setPastCourses(prev=>{
                    return {...prev,[k.id]:k};
                  })
                  setLanguagesLearnt(prev=>{
                    return {...prev,[k.course.name]:(k.course.id)};
                  })
                }
                else if(curdate<startdate&&k.completed_percent!==100){
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
  }, [props]);

  console.log(liveCourses);
  return (
    <div className={classes.root}>
      <CssBaseline/>
      <Snackbar
            anchorOrigin={{ vertical : 'bottom', horizontal: 'center' }}
            open={openS}
            autoHideDuration={5000}
            color="success"
            onClose={handleCloseSnack}
            key={'bottom' + 'center'}
          >
            <Alert onClose={handleCloseSnack} severity="success">
              <div style={{"fontSize" : "20px"}}>Hello { studentName }! </div>
            </Alert>
          </Snackbar>
      <Drawer />
      <React.Fragment className={classes.content}>
      <Container maxWidth="lg" className={classes.container}>
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
                      rotate={180}
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
                                image= { '/static/' + liveCourses[e].course.language.name + '.svg' }
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
                                image= { '/static/' + pastCourses[e].course.language.name + '.svg' }
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
                                  { '/static/' + upcomingCourses[e].course.name}
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
export default StudentDashboard