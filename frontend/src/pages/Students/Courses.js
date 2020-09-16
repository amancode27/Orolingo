import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import basename from "../Home/basename.js";
import {
     CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Container, Row, Col
  } from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CssBaseline } from "@material-ui/core";

const useStyles = makeStyles({
    pap: {
    maxWidth: 345,
    },
    media: {
    height: 140,
    },
    
});



const CourseCard = (props) => {
    const courses = props.courses;
    const classes = useStyles();
    console.log(courses);
    return (
        <div>
            <CssBaseline/>
            <Container>
            <Row>
            {
                courses.map(k=>(
                    <Col md="4" style={{marginBottom:"20px"}}>
                    <Card className={classes.pap}>
                        <CardActionArea>
                            <CardMedia
                            className={classes.media}
                            image="https://source.unsplash.com/200x200/?language"
                            />
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="h2">
                            {k.name}
                            </Typography>
                            <Typography variant="h5" color="textSecondary" component="h4">
                                Language : {k.language}
                            </Typography>

                            </CardContent>
                        </CardActionArea>
                        <CardActions>
                            <Link to={`/dashboard/courses/details/${k.id}`}>
                                <Button variant="contained" color="primary" size="lg">View </Button>
                            </Link>
                            <Button size="small" color="primary">
                            Learn More
                            </Button>
                        </CardActions>
                        </Card>
                    </Col>
                ))
            }
            </Row>
            </Container>
      </div>
    );
  };

const Courses =(props) => {
    const [courses,setCourses] = useState([]);   //contains all the courses related to chosen language
    useEffect(()=>{
        axios.get(`${basename}/api/language/`)
        .then(res=>{
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
        </div>
    )
}
export default Courses