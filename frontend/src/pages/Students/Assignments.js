import React,{ useState, useEffect } from 'react'
import {Link} from 'react-router-dom';
import basename from "../Home/basename.js";
import axios from "axios";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const AssignmentCard = (props) => {
  const assignments = props.assignments;
  return (
    <div style={{width:"300px"}}>
      <Card>
        <CardBody>
            <CardTitle style={{fontSize:"25px",textAlign:"center"}}>Assignment-{props.index+1}</CardTitle>
            <CardSubtitle style={{fontSize:"20px"}}>Topic: {assignments['name']}</CardSubtitle>
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
  const [assignments,setAssignments] = useState([]);
  const course_id = props.match.params['id'];
  useEffect(()=>{
    axios.get(`${basename}/api/assignments/?course=${course_id}`)
         .then(res=>{
            const tmp = res.data.objects;
            tmp.map(k=>{
                const tmpassignment = {};
                tmpassignment['name'] = k.name;
                setAssignments(prev=>{
                    return [...prev,tmpassignment];
                }) 
            });
         });
  },[props.match.params['id']]);
  console.log(assignments);
    return(
        <div>
            {assignments.map((k,index)=>(
            <AssignmentCard assignments={k} index={index}/>
            ))};
        </div>
    );
};
export default Assignment;