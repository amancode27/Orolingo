import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import basename from "./basename.js";
import axios from "axios";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  ListGroup,
  ListGroupItem,
} from "reactstrap";

const TrainerDashboard = (props) => {
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    axios
      .get(`${basename}/api/language/?trainers=${props.userId}`)
      .then((res) => {
        setLanguages(res.data.objects);
      });
  });

  return (
    <Card>
      <CardBody>
        <CardTitle>Languages you teach</CardTitle>
        <CardText>
          <ListGroup>
            {languages.map((element) => 
              <ListGroupItem>{element.name}</ListGroupItem>
            )}
          </ListGroup>
        </CardText>
      </CardBody>
    </Card>
  );
};

TrainerDashboard.propTypes = {};

export default TrainerDashboard;
