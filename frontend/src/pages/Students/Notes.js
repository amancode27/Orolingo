import React,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import basename from "../Home/basename.js";
import axios from "axios";
import {
    Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle, Button
  } from 'reactstrap';

const NotesCard = (props) => {
  const notes = props.notes;
  return (
    <div style={{width:"300px"}}>
      <Card>
        <CardBody>
            <CardTitle style={{fontSize:"25px",textAlign:"center"}}>TOPIC: {notes['name']}</CardTitle>
            <CardText style={{fontSize:"15px"}}>{notes['body']}</CardText>
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
const Notes = (props) =>{
      const [notes,setNotes] = useState([]);
      const course_id = props.match.params['id'];
      useEffect(()=>{
        axios.get(`${basename}/api/note/?course=${course_id}`)
             .then(res=>{
                const tmp = res.data.objects;
                tmp.map(k=>{
                    const tmpnotes = {};
                    tmpnotes['name'] = k.title;
                    tmpnotes['body'] = k.body;
                    setNotes(prev=>{
                        return [...prev,tmpnotes];
                    }) 
                });
             });
      },[props.match.params['id']]);
    return(
        <div>
            {notes.map((k,index)=>(
            <NotesCard notes={k} index={index}/>
            ))};
        </div>
    );
};
export default Notes;