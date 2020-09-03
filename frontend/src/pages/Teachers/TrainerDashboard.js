import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import basename from "./../Home/basename.js";
import axios from "axios";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  
  Button,
  Row,
  Col,
  Container,
  
} from "reactstrap";
import { ListGroup, ListGroupItem } from 'reactstrap';

import DropDown from "../Students/Dropdown.js";
import { Chip } from "@material-ui/core";
import { Link} from "react-router-dom";

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

  const [upcomingCourses,setUpcomingCourses] = useState([]);
  const [liveCourses,setLiveCourses] = useState([]);
  const [languages,setLanguages] = useState({});

  useEffect(()=>{
    axios
    .get(`${basename}/api/course/?trainer=${props.userId}`)
    .then((res) => {
        const tmp = res.data.objects;
        setLiveCourses([]); setUpcomingCourses([]);
        tmp.map(k=>{
          const startdate = Date.parse(k.startdate);
          const enddate = Date.parse(k.enddate);
          const curdate = Date.now();
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
<Container>
  <Row>
  <Col sm="4" >
    <Row >
        <Card body>
          <CardTitle className="text-center">Profile (Trainer) </CardTitle>
          <img width="100%" src="" alt="Profile photo" />
        </Card>
      </Row>
      <Row >
        <Card body>
          <CardTitle className="text-center">Languages You Teach</CardTitle>
          <ListGroup style={{marginTop:"20px",marginBottom:"20px",fontSize:"15px",textAlign:"center"}} size="lg">
            {Object.keys(languages).map(k=>(
              <Link style={{textDecoration:"none",}} to={`dashboard/trainercourses/${k}`}>
                <ListGroupItem>{k}</ListGroupItem>
              </Link>
            ))}
            
          </ListGroup>
        </Card>
      </Row>
  </Col>

  <Col sm="8" style={{paddingLeft:"0px"}}>
  <Card style={{paddingTop:"25px",paddingBottom:"25px"}}>
  <CardTitle className="text-center" style={{fontSize:"20px"}}>Your Courses</CardTitle>
                <hr></hr> <br></br>
                <CardTitle className="text-center" style={{fontSize:"20px"}}>Live Courses</CardTitle>
                <hr></hr>
                <CardText>
                  
                    {liveCourses.map((e) => (
                      <div>
                        <Row className="text-center">
                        <Col> 
                          <Card body>
                            <Link to={`/dashboard/trainercourses/uploads/${e.id}`}>
                              <Button color="success">Upload Content</Button>
                            </Link>                        
                          </Card>
                        </Col>
                        <Col>
                        <Card body>
                          <Link to={`/dashboard/chatapp/${e.id}`}>
                            <Button color = "success">Chat App</Button>
                          </Link>
                          </Card>
                        </Col>

                        <Col> 
                          <Card body>
                            <Link to={`dashboard/editcourse/${e.id}`}>
                              <Button color="success">Edit</Button>
                            </Link>                        
                          </Card>
                        </Col>

                          <Col> 
                            <Card body>
                              <CardTitle>{e.name}</CardTitle>                        
                            </Card>
                          </Col>

                          <Col> 
                            <Card body>
                              <CardTitle>Start-Date :{e.startdate}</CardTitle>                        
                            </Card>
                          </Col>
                          <Col> 
                            <Card body>
                              <CardTitle>End Date: {e.enddate}</CardTitle>                        
                            </Card>
                          </Col>
                          </Row>
                      </div>
                    ))}
                  
                </CardText>
                <hr></hr> <br></br>
                <CardTitle className="text-center" style={{fontSize:"20px"}}>Upcoming Courses</CardTitle>    
                <hr></hr>  
                <CardText>
                  
                    {upcomingCourses.map((e) => (
                      <div>
                        <Row className="text-center">
                        <Col> 
                          <Card body>
                            <Link to={`/dashboard/trainercourses/uploads/${e.id}`}>
                              <Button color="success">Upload Content</Button>
                            </Link>                        
                          </Card>
                        </Col>

                        <Col> 
                          <Card body>
                            <Link to={`dashboard/editcourse/${e.id}`}>
                              <Button color="success">Edit</Button>
                            </Link>                        
                          </Card>
                        </Col>

                          <Col> 
                            <Card body>
                              <CardTitle>{e.name}</CardTitle>                        
                            </Card>
                          </Col>

                          <Col> 
                            <Card body>
                              <CardTitle>Start-Date :{e.startdate}</CardTitle>                        
                            </Card>
                          </Col>
                          <Col> 
                            <Card body>
                              <CardTitle>End Date: {e.enddate}</CardTitle>                        
                            </Card>
                          </Col>
                          </Row>
                      </div>
                    ))}
                  
                </CardText>
                <hr></hr>
    <Link to="dashboard/createcourse" style={{marginLeft:"auto",marginRight:"auto"}}>
              <Button style ={buttonStyle} color="primary" size="lg">Upload Course</Button>
            </Link>
    </Card>

  </Col>

  </Row>
  </Container> 
    </div>
  );
};

TrainerDashboard.propTypes = {};

export default TrainerDashboard;

