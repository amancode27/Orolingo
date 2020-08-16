import React, { useState, useEffect } from "react";
import basename from "./../Home/basename.js";
import PropTypes from "prop-types";
import axios from "axios";
import { ListGroup, Card, ListGroupItem, Button } from "reactstrap";

const LanguageTrainers = (props) => {
  const [trainers, setTrainers] = useState([]);
  const [language, setLanguage] = useState("");

  useEffect(() => {
    axios
      .get(`${basename}/api/language/${props.match.params.languageid}/`)
      .then((res) => {
        const trainerURIs = res.data.trainers;
        setLanguage(res.data.name);
        trainerURIs.forEach((e) => {
          axios.get(`${basename}${e}`).then((res) => {
            setTrainers((prev) => [...prev, res.data]);
          });
        });
      });
  }, []);

  function registerCourse(trainer) {
    axios
      .get(
        `${basename}/api/course/?trainer=${trainer.user.id}&language=${props.match.params.languageid}`
      )
      .then((res) => {
        const course = res.data.objects[0];
        axios.post(`${basename}/api/student_course/`, {
          student: `/api/student/${props.userId}/`,
          course: `/api/course/${course.id}/`,
        })
        .then(props.history.push('/dashboard'))
      });
  }

  return (
    <div>
      <h1>{language}</h1>
      <ListGroup>
        {trainers.map((e) => (
          <ListGroupItem>
            <Card>
              {e.user.fullname}
              <Button onClick={() => registerCourse(e)}>Register</Button>
            </Card>
          </ListGroupItem>
        ))}
      </ListGroup>
    </div>
  );
};

LanguageTrainers.propTypes = {};

export default LanguageTrainers;
