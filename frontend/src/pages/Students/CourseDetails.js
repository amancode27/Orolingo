import React, { useEffect } from 'react';
import {useState,setState} from 'react';
import axios from "axios";
import basename from "../Home/basename.js";
import '../style/CourseDetails.css';
import Reviews from './Reviews';
import { Button, Jumbotron } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Chip, Container, CssBaseline, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles, useTheme  } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//import Button from '@material-ui/core/Button';
import useFullPageLoader from "../../Components/FullPageLoader/useFullPageLoader.js";


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      marginTop : "40px"
    },
    content: {
      flex: '1 0 auto',
      padding: '50px',
    
    },
    media: {
        height: 400,
      },
  }));

const CourseDetails = (props,userinfo) =>{
    const classes = useStyles();
    const buttonStyle = {
        width:"100px",
        fontSize:"15px",
        fontFamily: "sans-serif",
        height:"40px",
        borderRadius:"10px",
        left:"80%",
        top:"89%",
        position:"absolute"
      };
    const [loader,showLoader,hideLoader] = useFullPageLoader();

    const [courseDetails,setCourseDetals] = useState({});
    const [trainerDetails,setTrainerDetails] = useState({});
    const id = props.match.params['course_id'];
    useEffect(()=>{
        showLoader();
        axios.get(`${basename}/api/course/`)
        .then((res)=>{
            hideLoader();
            const tmp = res.data.objects;
            tmp.map(k=>{
                if(k.id == id){
                    const coursetmp = {};
                    const trainertmp = {};
                    coursetmp['name'] = k.name;
                    coursetmp['language'] = k.language.name;
                    coursetmp['startdate'] = k.startdate;
                    coursetmp['enddate'] = k.enddate;
                    coursetmp['cost'] = "Price : Rs" + k.cost;
                    coursetmp['description'] = k.description;
                    trainertmp['name'] = k.trainer.user.fullname;
                    setCourseDetals(coursetmp);
                    setTrainerDetails(trainertmp);
                }
            });
        });
    },[props.match.params['course_id']]);

    const Buy =()=>{
        if(props.user.is_student){
            return(
                <Link to = {`/purchase/${id}`}>
                                <Chip 
                                    label = "Join Now!"
                                    clickable
                                    color = "primary"
                                    style = {{fontSize : "15px", float:"right", marginRight : "20px"}}></Chip>   
                            </Link> 
            )
        }
        else{
            return null;
        }
    }

    return(
        <div className={classes.root}>
            <React.Fragment className={classes.content}> 
            
            <CssBaseline/>
            <Container>
            <Grid container spacing={1}>
                <Grid item md={4} sm={12}>
                <CardActionArea>
                    <Card elevation = {3} style={{minHeight : "600px"}}>                        
                        <Typography variant="h2" gutterBottom style={{padding : "30px"}}>
                            Hi! I'm {trainerDetails['name']}.
                        </Typography>
                    <hr/>
                    <img src="\trainer.jpg" alt="profilephoto" width="100%" style={{maxHeight : "400px"}} ></img>                    
                    </Card>
                    </CardActionArea>
                </Grid>
                <Grid item md = {8} sm={12}>
                <CardActionArea>
                    <Card elevation = {3} style={{minHeight : "600px"}}>
                        <CardMedia
                            className={classes.media}
                            image= { '/' + courseDetails['language'] + '.svg'}
                            title="Course Name"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h3" component="h2">
                            {courseDetails['name']}
                            </Typography>
                            <Typography gutterBottom variant="h4">
                               <span style={{float : "left"}}> Starts on {courseDetails['startdate']}!</span> <span style={{marginRight : "20px", float : "right"}}> Ends on {courseDetails['enddate']} !!</span> <br/>
                            </Typography>
                            <Typography gutterBottom variant = "body1" style={{fontSize : "13px"}}>
                                {courseDetails['description']}
                            </Typography>
                            <Chip 
                                label={courseDetails['cost']}
                                clickable
                                style={{fontSize : "15px", float:"left"}}></Chip>
                            <Buy/>       
                            </CardContent>
                        </Card>
                    </CardActionArea>    
                </Grid>
            </Grid>
            </Container>
            {loader}
            </React.Fragment>
        </div>
    );
}

export default CourseDetails;