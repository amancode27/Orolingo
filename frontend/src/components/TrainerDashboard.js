import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import basename from "./basename.js";
import axios from "axios";
import {
  Card,
  CardTitle,
  CardBody,
  CardText,
  
  Button,
  Row,
  Col,
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
    <div>
    <Card body outline color="success">
      <CardBody>
        <CardTitle>Languages you teach</CardTitle>
        <CardText>
          <Row>
            {languages.map((element) =>
              <div>
              <Col md = "12" sm = "12"> 
              <Card body>
              <CardTitle>{element.name}</CardTitle>
              <CardText>Details of the course .... </CardText>
              <Button color="info">Assignments </Button> 
              </Card>
              </Col>    
              </div>
            )}
          </Row>
        </CardText>
      </CardBody>
    </Card>
    </div>
  );
};

TrainerDashboard.propTypes = {};

export default TrainerDashboard;

