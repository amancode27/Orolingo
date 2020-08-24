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
import DropDown from "../Students/Dropdown.js";
import { Chip, Link } from "@material-ui/core";

const TrainerDashboard = (props) => {
  const [languages, setLanguages] = useState([]);
  //const [languagestoteach,setLanguagesToTeach] = useState({});
  const [availabletoteach, setavailabletoteach] = useState({"English":"English", "Spanish":"Spanish","French":"French"});
  // const addToTeachLanguage = (key,value) =>{
  //   setLanguagesToTeach((prevState) =>{return {...prevState,[key]:value}});
  // }
  useEffect(() => {
    axios
      .get(`${basename}/api/language/?trainers=${props.userId}`)
      .then((res) => {
        setLanguages(res.data.objects);
      });
    //  axios
    //  .get(`${basename}/api/language_trainer/?trainers=${props.userId}`)
    //  .then((res) => {
    //     const languagestoteach = res.data.languages_to_teach;
    //     languagestoteach.forEach((e) => {
    //       axios.get(`${basename}${e}`).then((res) =>
    //       setLanguagesToTeach((prev) => {
    //         return { ...prev, [res.data.name]: e };
    //       })
    //     );
    //     })
    //  }); 
  });

  return (
    <div>
<Container>
    <Card body>
      <CardBody>
        <Row>
        <CardTitle>Languages you teach  : </CardTitle>
          <Row>
            <Col className="ml-3">
            {languages.map((element) =>
              <Chip label={element.name} clickable color="primary" className="mr-3"></Chip>
            )}
            </Col>
          </Row>
        </Row> 
      </CardBody>
    </Card>
    <Row >
      <Col md = "4">
    <Card body>
      <CardTitle className="text-center">Profile (Trainer) </CardTitle>
      <img width="100%" src="" alt="Profile photo" />
      <Card className="text-center">
        <CardBody>
          <Row>
            <CardTitle className="text-left mr-3 ml-3">Want to teach</CardTitle>
            <CardText>
              <Row>
                <div>
                  <Col>
                  <Link to="">
                    <Chip label = "Demo"></Chip>
                  </Link>
                  </Col>
                </div>
              </Row>
            </CardText>
          </Row>
        </CardBody>
        <DropDown availLanguages = {availabletoteach}></DropDown>
      </Card>
    </Card>
    </Col>
    <Col md="8">
      <Card>
        <CardBody>
          <CardTitle className = "text-center">Zoom API linking here</CardTitle>

        </CardBody>
      </Card>
    </Col>
    </Row>
    <Card className="mt-3">
          <CardTitle className="text-center mt-3" >Discussion Forum </CardTitle>
        <Row>
          <Col md="4">
            <Card body>
              <form method="post">
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Topic"
                    name="name"
                    type="text"
                  />
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Details "
                    name="message"
                    rows="5"
                  />
                </div>


                <div className="form-group">
                  <button  className="btn btn-primary">
                    Discuss &#10148;
                  </button>
                </div>
              </form>
          </Card>        
          </Col>
          <Col md="8">
            <Card body>
            <div className="commentList">
                <div className="media mb-3">
                  <img
                    className="mr-3 bg-light rounded"
                    width="48"
                    height="48"
                    src={`https://api.adorable.io/avatars/48/abott@adorable.png`}
                    alt="Avatar"
                  />

                  <div className="media-body p-2 shadow-sm rounded bg-light border">
                    <small className="float-right text-muted">Five minutes ago</small>
                    <h6 className="mt-0 mb-1 text-muted">Topic</h6>
                    Your queries here....
                  </div>
                </div>
                <div className="media mb-3">
                  <img
                    className="mr-3 bg-light rounded"
                    width="48"
                    height="48"
                    src={`https://api.adorable.io/avatars/48/abott@adorable.png`}
                    alt="Avatar"
                  />

                  <div className="media-body p-2 shadow-sm rounded bg-light border">
                    <small className="float-right text-muted">Five minutes ago</small>
                    <h6 className="mt-0 mb-1 text-muted">Topic</h6>
                    Your queries here....
                  </div>
                </div>

            </div>
            </Card>
          </Col>
          </Row>
        </Card>
  </Container> 
    </div>
  );
};

TrainerDashboard.propTypes = {};

export default TrainerDashboard;

