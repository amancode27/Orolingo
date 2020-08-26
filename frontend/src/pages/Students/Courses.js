import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom';
import PropTypes from "prop-types";
import basename from "../Home/basename.js";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const CourseCard = (props) => {
    const courses = props.courses;
    return (
        <div>
            {
                courses.map(k=>(
                    <div style={{width:"300px"}}>
                        <Card>
                        <CardBody>
                            <CardTitle style={{fontSize:"25px",textAlign:"center"}}>{k.name}</CardTitle>
                            <CardSubtitle style={{fontSize:"20px"}}>Topic: {k.language}</CardSubtitle>
                            <CardText style={{fontSize:"15px"}}>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
                            <Link to={`/dashboard/courses/details/${k.id}`}>
                                <Button color="primary" size="lg">View</Button>
                            </Link>
                        </CardBody>
                        </Card>
                    </div>
                ))
            }
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