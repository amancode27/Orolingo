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
  ListGroup,
  ListGroupItem,
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
      <Card>
        <CardBody>
          <CardTitle>Languages Learnt</CardTitle>
          <CardText>
            <ListGroup>
              {Object.keys(languagesLearnt).map((key, index) => (
                <Link to={`/language-trainers/${languagesLearnt[key].charAt(languagesLearnt[key].length-2)}/`}>
                  <ListGroupItem>{key}</ListGroupItem>
                </Link>
              ))}
            </ListGroup>
          </CardText>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle>Languages to learn</CardTitle>
          <CardText>
            <ListGroup>
              {Object.keys(languagesToLearn).map((key, index) => (
                <Link to={`/language-trainers/${languagesToLearn[key].charAt(languagesToLearn[key].length-2)}/`}>
                  <ListGroupItem>{key}</ListGroupItem>
                </Link>
              ))}
            </ListGroup>
          </CardText>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <CardTitle>Courses</CardTitle>
          <CardText>
            <ListGroup>
              {courses.map((e) => (
                <Link to="/">
                  <ListGroupItem>{e.course.language.name}-{e.course.trainer.user.fullname}</ListGroupItem>
                </Link>
              ))}
            </ListGroup>
          </CardText>
        </CardBody>
      </Card>
    </div>
  )
}

StudentDashboard.propTypes = {

}

export default StudentDashboard