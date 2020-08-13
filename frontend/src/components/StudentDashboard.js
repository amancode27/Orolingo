import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import basename from "./basename.js"
import axios from 'axios'
import { Link } from 'react-router-dom'
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

const StudentDashboard = props => {
  const [languagesLearnt, setLanguagesLearnt] = useState({});
  const [languagesToLearn, setLanguagesToLearn] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get(`${basename}/api/student/${props.userId}/`)
      .then((res) => {
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
                              <Link to={`/language-trainers/${languagesToLearn[key].charAt(languagesToLearn[key].length - 2)}/`}>
                                <Button color="info"> {key} </Button>
                              </Link>
                            </Col>
                          </div>
                        ))}
                      </Row>
                    </CardText>
                  </Row>
                </CardBody>
              </Card>
            </Card>
          </Col>
          <Col md="8">
            <Card>
              <CardBody>
                <CardTitle className="text-center">Your Courses</CardTitle>
                <CardText>
                  <Row>
                    {courses.map((e) => (

                      <div>
                        <Col md="12" >
                          <Card body>
                            <CardTitle>{e.course.language.name}</CardTitle>

                            <CardSubtitle>By {e.course.trainer.user.fullname}</CardSubtitle>


                            <Link to="/">
                              <Button color="primary"> Continue  </Button>
                            </Link>
                          </Card>
                        </Col>
                      </div>
                    ))}
                  </Row>
                </CardText>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

StudentDashboard.propTypes = {

}

export default StudentDashboard
