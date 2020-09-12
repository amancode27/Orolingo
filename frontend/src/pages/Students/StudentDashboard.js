import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types';

import basename from "./../Home/basename.js";
import axios from 'axios';
import { Link } from 'react-router-dom';
import DropDown from './Dropdown.js';
import { Form, FormGroup, Label, Input, Jumbotron, Media } from 'reactstrap';
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Row,
  Col,
  Button,
  CardSubtitle,
  Container,
  CardImg,
  Progress,
} from "reactstrap";
import Chip from '@material-ui/core/Chip';


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

  console.log(liveCourses);
  return (
    <div>
      <React.Fragment>
      <Jumbotron>
        <Row>
         <Col className="text-center" md="4">
          <img src="https://source.unsplash.com/100x100/?man" height = "100"/> 
         </Col>
        <Col md = "8">
         <h1 className="display-2">
          Hello! {studentName} 
        </h1>
        </Col>
        </Row>
        <hr className="my-2" />
      </Jumbotron>
      <Container>
        <Card>
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
        </Card>
        <Row>
          <Col md="4">
            <Card className="text-center" style={{marginBottom:"10px",fontSize:"15px",paddingBottom:"30px"}} body>
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
            </Card>
          </Col>
          <Col md="8">
            <Card style={{marginBottom:"15px",fontSize:"15px",paddingBottom:"30px"}} body>
              
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
            </Card>
          </Col>
        </Row>
        <Card body>
              <CardTitle className="text-center" style={{fontSize:"20px"}}>Your Courses</CardTitle>
                <hr></hr> <br></br>
                <CardTitle className="text-center" style={{fontSize:"20px"}}>Live Courses</CardTitle>
                <hr></hr>
                <CardText>
                  <Row>
                    {liveCourses.map((e) => (
                      <div>
                            <Col>
                            <Card>
                            <CardBody>
                              <CardTitle>{e.course.name}</CardTitle>
                              <CardText>Start-Date : {e.course.startdate}<br/>End Date : {e.course.enddate} </CardText>
                              <div className="text-center">{e.completed_percent}%</div>
                              <Progress value={e.completed_percent} />
                              <div className="text-center mt-3">
                              <Link to={`/dashboard/courses/coursecontent/${e.id}`}>
                                <Button className="btn" color="success">Go</Button>
                              </Link>
                              </div>
                            </CardBody>
                          </Card>
                            </Col>
                      </div>
                    ))}
                  </Row>
                </CardText>
                <hr></hr> <br></br>
                <CardTitle className="text-center" style={{fontSize:"20px"}}>Recorded Courses</CardTitle>    
                <hr></hr>  
                <CardText>
                      <Row>
                    {pastCourses.map((e) => (
                      <div>
                        <Col>
                            <Card>
                            <CardBody>
                              <CardTitle>{e.course.name}</CardTitle>
                              <CardText>Start-Date :{e.course.startdate}<br/>End Date: {e.course.enddate} </CardText>
                              <div className="text-center">{e.completed_percent}%</div>
                              <Progress value={e.completed_percent} />
                              <div className="text-center mt-3">
                              <Link to={`/dashboard/courses/coursecontent/${e.id}`}>
                                <Button className="btn" color="success">Go</Button>
                              </Link>
                              </div>
                            </CardBody>
                          </Card>
                            </Col>
                      </div>
                    ))}
                  </Row>
                </CardText>
                <hr></hr> <br></br>
                <CardTitle className="text-center" style={{fontSize:"20px"}}>Upcoming Courses</CardTitle>
                <hr></hr>
                <CardText>
                    <Row>
                    {upcomingCourses.map((e) => (
                      <div>
                         <Col>
                            <Card>
                            <CardBody>
                              <CardTitle>{e.course.name}</CardTitle>
                              <CardText>Start-Date :{e.course.startdate}<br/>End Date: {e.course.enddate} </CardText>
                              <div className="text-center">{e.completed_percent}%</div>
                              <Progress value={e.completed_percent} />
                              <div className="text-center mt-3">
                              <Link to={`/dashboard/courses/coursecontent/${e.id}`}>
                                <Button className="btn" color="success">Go</Button>
                              </Link>
                              </div>
                            </CardBody>
                          </Card>
                            </Col>
                      </div>
                    ))}
                  </Row>
                </CardText>
              </Card>
        </Container>

        </React.Fragment>
        
          
      </div>
  )
}

StudentDashboard.propTypes = {

}

export default StudentDashboard