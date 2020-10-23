import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import basename from "../Home/basename.js";
import {
      Row, Col
  } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline'

import useFullPageLoader from "../../Components/FullPageLoader/useFullPageLoader.js";

const useStyles = makeStyles({
    pap: {
    maxWidth: 345,
    },
    media: {
    height: 200,

    },
    
});

const useMoreStyles = makeStyles((theme) => ({
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
      height: '100%',
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
  }));

const CourseCard = (props) => {
    const courses = props.courses;
    const classes = useStyles();
    const [langName, setLangName] = useState("");

    const moreclasses = useMoreStyles();
    useEffect(() => {
        courses.map( k => (setLangName( k.language ) ))
    },[props]);

    console.log(courses);
    return (
        <div>
            <CssBaseline/>
            <div className={moreclasses.heroContent}>
                <Container maxWidth="sm">
                    <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
                    {langName}
                    </Typography>
                    <Typography variant="h5" align="center" color="textSecondary" paragraph>
                        You can veiw all the course of {langName} language here! Try one now!
                        </Typography>
                        <div className={classes.heroButtons}>
                        <Grid container spacing={2} justify="center">
                            <Grid item>
                            <Button variant="outlined" color="primary">
                                Search
                            </Button>
                            </Grid>
                        </Grid>
                        </div>
                </Container>
            </div>
            <Container>
            <Grid container spacing={4}>
            {
                courses.map(k=>(
                    <Grid item key={k} xs={12} sm={6} md={4} style={{marginTop:"20px"}}>
                    <Card className={classes.pap}>
                    <CardActionArea>
                        <Link to={`/dashboard/courses/details/${k.id}`} style={{textDecoration : "none", color : "black"}}>
                            <CardMedia
                            className={classes.media}
                            image= {'/static/' + langName + '.svg'}
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2" >
                            {k.name}
                            </Typography>
                            <Typography gutterBottom variant="h6" component="h2" style={{float : "right",padding : "2px" }}>
                            By - { k.trainer }
                            </Typography>
                            </CardContent>
                        </Link>    
                        </CardActionArea>
                        </Card>
                    </Grid>
                ))
            }
            </Grid>
            </Container>         
        </div>
    );
  };

const Courses =(props) => {
    const [courses,setCourses] = useState([]);   //contains all the courses related to chosen language
    const [loader,showLoader, hideLoader] = useFullPageLoader();

    useEffect(()=>{
        showLoader();
        axios.get(`${basename}/api/language/`)
        .then(res=>{
            hideLoader();
            const tmp = res.data.objects;
            tmp.map(k=>{
                if(k.name == props.match.params['language']){
                    const url = k.resource_uri;
                    axios.get(`${basename}${url}`)     //use this to fetch courses for a language(contains language name)
                        .then(res=>{
                            axios.get(`${basename}/api/course/?language=${res.data.id}`)
                            .then(res2=>{
                                const tmp2 = res2.data.objects;
                                tmp2.map(k=>{
                                    let obj = {};
                                    obj['id'] = k.id;
                                    obj['name'] = k.name;
                                    obj['language'] = k.language.name;
                                    obj['trainer'] = k.trainer.user.fullname;
                                    setCourses(prev=>{
                                        return [...prev,obj];
                                    });
                                });
                            });
                        });
                }
            });
        });
    },[props.match.params['language']]);
    return(
        <div>    
            <CourseCard courses = {courses}/>
            {loader}
        </div>
    )
}
export default Courses