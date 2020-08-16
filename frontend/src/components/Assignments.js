import React from 'react'
import {Link} from 'react-router-dom';
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const AssignmentCard = (props) => {
  return (
    <div style={{width:"300px"}}>
      <Card>
        <CardBody>
            <CardTitle style={{fontSize:"25px",textAlign:"center"}}>Assignment-1</CardTitle>
            <CardSubtitle style={{fontSize:"20px"}}>Topic:</CardSubtitle>
            <CardText style={{fontSize:"15px"}}>Some quick example text to build on the card title and make up the bulk of the card's content.</CardText>
            <Link to="#">
                <Button color="primary" size="lg">Download</Button>
            </Link>
            <Link to="#" style={{marginLeft:"20px"}}>
                <Button color="primary" size="lg">View</Button>
            </Link>
        </CardBody>
      </Card>
    </div>
  );
};
const Assignment = (props) =>{
    return(
        <div>
            <AssignmentCard/>
        </div>
    );
};
export default Assignment;