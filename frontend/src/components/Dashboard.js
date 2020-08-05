import React, { useState, useEffect } from "react";
import basename from "./basename.js";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

const Dashboard = (props) => {
  const [userDetail, setUserDetail] = useState({});
  const [languagesLearnt, setLanguagesLearnt] = useState({});
  const [languagesToLearn, setLanguagesToLearn] = useState({});
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    console.log(props.userId + " From Dashboard");
    const getDetail = async (userId) => {
      setUserDetail({ ...(await props.getUserDetail(props.userId)) });
    };
    if (props.loggedIn) {
      getDetail(props.userId);
    }

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
      <h1>
        Hi {userDetail.fullname}, you are a
        {userDetail.is_student ? "Student" : userDetail.is_trainer && "Trainer"}
      </h1>
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
  );
};

export default Dashboard;
