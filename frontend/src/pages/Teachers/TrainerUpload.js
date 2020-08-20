import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import basename from "../Home/basename.js";
import {
    Container,
    Card,
    CardTitle,
    CardBody,
    CardText,
    Button,
    Row,
    Col,
    CardSubtitle,
} from "reactstrap";

const TrainerUpload = (props) => {
    const [assignments, setAssignment] = useState([]);
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        axios
            .get(`${basename}/api/assignment/?trainer=${props.usedId}/`)
            .then((res) => {
                setAssignment(res.data.objects);
            });
        axios
            .get(`${basename}/api/note`)    
            .then((res) => {
                setNotes(res.data.objects);
            });
    });

    return(
        <div>
            <Container>
                <Row>
            {assignments.map((element) => 
                <div>
                    <Col>
                    <Card>
                        <CardBody>
                            <CardTitle>{element.name} </CardTitle>
                            <CardSubtitle>By ~ {element.trainer.name} </CardSubtitle>
                            <CardText>{element.course.name}</CardText>
                        </CardBody>
                    </Card>
                    </Col>

                </div>
            )};
            </Row>
        </Container>    
        </div>
    )


}
export default TrainerUpload;