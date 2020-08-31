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
    <div style={{marginLeft:"30px",flex: "0 0 25%"}}>
      <Card>
        <CardBody>
            <CardTitle style={{fontSize:"25px",textAlign:"center"}}>TOPIC: {notes['topic']}</CardTitle>
            <CardText style={{fontSize:"15px",textAlign:"center",marginTop:"20px",marginBottom:"20px",minHeight:"100px"}}>{notes['description']}</CardText>
            <a href={`http://localhost:8000${notes['pdf']}`} target='blank'>
                <Button color="primary" size="lg">Download</Button>
            </a>
            <p style={{float:"right",marginBottom:"0px",marginTop:"10px",fontSize:"14px"}}>Date added-{notes['created_at']}</p>
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
                    tmpnotes['topic'] = k.topic;
                    tmpnotes['description'] = k.description;
                    tmpnotes['created_at'] = k.created_at;
                    tmpnotes['pdf'] = k.pdf;
                    setNotes(prev=>{
                        return [...prev,tmpnotes];
                    }) 
                });
             });
      },[props.match.params['id']]);
    return(
        <div style={{display:"flex",flexFlow:"row",flexWrap:"wrap",paddingLeft:"90px"}}>
            {notes.map((k,index)=>(
            <NotesCard notes={k} index={index}/>
            ))};
        </div>
    );
};
export default Notes;