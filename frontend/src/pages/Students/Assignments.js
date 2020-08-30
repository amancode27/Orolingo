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
    <div style={{marginLeft:"30px",flex: "0 0 25%"}}>
      <Card>
        <CardBody>
            <CardTitle style={{fontSize:"25px",textAlign:"center"}}>Topic: {assignments['topic']}</CardTitle>
            <CardText style={{fontSize:"15px",textAlign:"center",marginTop:"20px",marginBottom:"20px",minHeight:"100px"}}>{assignments['description']}</CardText>
            <a href={`http://localhost:8000${assignments['pdf']}`} target='blank'>
                <Button color="primary" size="lg">Download</Button>
            </a>
            <p style={{float:"right",marginBottom:"0px",marginTop:"10px",fontSize:"14px"}}>Date added-{assignments['created_at']}</p>
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
                tmpassignment['topic'] = k.topic;
                tmpassignment['description'] = k.description;
                tmpassignment['created_at'] = k.created_at;
                tmpassignment['pdf'] = k.pdf;
                setAssignments(prev=>{
                    return [...prev,tmpassignment];
                }) 
            });
         });
  },[props.match.params['id']]);
  console.log(assignments);
    return(
        <div style={{display:"flex",flexFlow:"row",flexWrap:"wrap",paddingLeft:"90px"}}>
            {assignments.map((k,index)=>(
            <AssignmentCard assignments={k} index={index}/>
            ))};
        </div>
    );
};
export default Assignment;