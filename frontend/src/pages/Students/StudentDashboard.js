import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import basename from "./../Home/basename.js"
import axios from 'axios'
import { Link } from 'react-router-dom'
import DropDown from './Dropdown.js'
import { Form, FormGroup, Label, Input } from 'reactstrap';
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  Button,
  Row,
  Col,
  CardSubtitle,
  Container,
} from "reactstrap";
import Chip from '@material-ui/core/Chip';

const StudentDashboard = props => {
  const [languagesLearnt, setLanguagesLearnt] = useState({});
  const [languagesToLearn, setLanguagesToLearn] = useState({});
  const [courses, setCourses] = useState([]);
  const [availableLanguages , setavailableLanguages] = useState({});
  const [buyCourse,setBuyCourse] = useState("");

  const changeCourse = (e) =>{
    if(e.target.value=="Select a language") setBuyCourse("");
    else
      setBuyCourse(e.target.value);
    console.log(buyCourse);
  }
  const addToLearnLanguage = (key,value) =>{
    // axios.put(`${basename}/api/student/${props.userId}/`,{

    // });
    setLanguagesToLearn((prevState) =>{return {...prevState,[key]:value}});
  }

  const deleteToLearnLanguage = (key) =>{
      const tmp={};
      setLanguagesToLearn((prevState) =>{
        for(let k of Object.keys(prevState)){
          if(k == key) continue;
          tmp[k]=prevState[k];
        }
        return tmp;
      })
  }

  useEffect(() => {
    axios
      .get(`${basename}/api/student/${props.userId}/`)
      .then((res) => {
        console.log(res.data);
        const languageslearnt = res.data.languages_learnt;
        const languagestolearn = res.data.languages_to_learn;
        languageslearnt.forEach((e) => {
          axios.get(`${basename}${e}`).then((res) =>
            setLanguagesLearnt((prev) => {
              return { ...prev, [res.data.name]: e };
            })
          );
        });
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
            setCourses(res.data.objects);
          });
      })
      .catch((error) => {
        console.log(error);
      });
      axios.get(`${basename}/api/language/`)
           .then((res)=>{
             const tmp = res.data.objects;
             Object.keys(tmp).map((k)=>{
                setavailableLanguages((prev)=>{
                  return {...prev,[tmp[k].name]:tmp[k].name};
                })
             });
           });
  }, [props]);

  return (
    <div>
      <Container>
        <Card>
          <CardBody>
            <Row>
              <CardTitle className="ml-3 mr-3">Languages Learnt : </CardTitle>
              <CardText>
                <Row>
                  {Object.keys(languagesLearnt).map((key, index) => (
                    <div>
                      <Col>

                        <Link to={`/language-trainers/${languagesLearnt[key].charAt(languagesLearnt[key].length - 2)}/`}>
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
            <Card className="text-center">

              <CardTitle className="mt-3">MonoLingual</CardTitle>
              <img width="100%" src="" alt="Profile photo" />
              <Card>
                <CardBody>
                  <Row>
                    <CardTitle className="text-left mr-3 ml-3">Want to learn:</CardTitle>
                    <CardText>
                      <Row>

                        {Object.keys(languagesToLearn).map((key, index) => (
                          <div>
                            <Col>
                              {/* <Link to={`/language-trainers/${languagesToLearn[key].charAt(languagesToLearn[key].length - 2)}/`}>
                                <Button color="info"> {languagesToLearn[key]} </Button>
                              </Link> */}
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
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <CardBody>
                <CardTitle className="text-center">Your Courses</CardTitle>
                <CardText>
                  
                    {courses.map((e) => (

                      <div>
                        <Row className="text-center">
                        <Col> 
                          <Card body>
                            <Link to="/">
                              <Button color="success">Go</Button>
                            </Link>                        
                          </Card>
                        </Col>
                          <Col> 
                            <Card body>
                              <CardTitle>{e.course.language.name}</CardTitle>                        
                            </Card>
                          </Col>
                          <Col> 
                            <Card body>
                              <CardTitle>Completed {e.completed_percent}%</CardTitle>                        
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
              </CardBody>
            </Card>
            <Form>
              <FormGroup>
                <Label for="buycourses">Select a language to buy a course</Label>
                <Input type="select" name="select" id="buycourses" onChange = {(e)=>changeCourse(e)}>
                  <option>Select a language</option>
                  {Object.keys(availableLanguages).map((key,index)=>(
                    <option>{key}</option>
                  ))}
                </Input>
              </FormGroup>
              <Link to={`/dashboard/courses/${buyCourse}`}>
                <Button>View Courses</Button>
              </Link>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

StudentDashboard.propTypes = {

}

export default StudentDashboard

{/* <Link to="/">
                              <Button color="primary"> Continue  </Button>
                            </Link> */}