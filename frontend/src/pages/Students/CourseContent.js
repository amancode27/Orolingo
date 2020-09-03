import React,{ useState, useEffect } from 'react';
import { Button } from 'reactstrap';
import {Link} from 'react-router-dom'
import basename from "../Home/basename.js";
import FeedbackModal from './ModalForFeedback'
import axios from "axios";
import {
    Card,
    CardTitle,
    CardBody,
    CardText,
    Row,
    Col,
    CardSubtitle,
    Container,
    CardHeader,
    CardFooter,
  } from "reactstrap";
  import * as timeago from 'timeago.js';
  

const CourseContent = (props,user) =>{
    const buttonStyle = {
        width:"300px",
        fontSize:"20px",
        fontFamily: "sans-serif",
        height:"50px",
        marginLeft:"50px",
        borderRadius:"10px"
      };
      const student_course_id = props.match.params['id'];

      const [forumData, setForumData] = useState([]);
      const [title, setTitle] = useState("");
      const [description, setDescription] = useState("");
      const changeTitle = (e) => {
          setTitle(e.target.value);
          
      }

      const changeDescription = (e) => {
            setDescription(e.target.value);
      }
      const discuss = (e) => {
        e.preventDefault();
        axios.get(`${basename}/api/student_course/${student_course_id}`)
             .then(res=>{
                axios.post(`${basename}/auth/api/forum/create/`,{
                  "title" : title,
                  "description" : description,
                  "creator": props.username,
                  "student_course": res.data.id,
                  "student" : props.userId
                })
                .then((res) => {
                  
                  axios.get(`${basename}/auth/api/forum?student_course=${student_course_id}`)
                  .then((res) => {
                  setForumData(res.data); 
                })});
             })
        setTitle("");
        setDescription("");
      }

    useEffect(() => {       
      axios.
      get(`${basename}/auth/api/forum?student_course=${student_course_id}`)
      .then((res) => {
        console.log(res.data);
        const tmp = res.data.objects;
        setForumData(res.data); 
      });
    },[props] );

    //console.log(forumData);

    return (
        
        <div>
            <Link to={`${student_course_id}/assignments`}>
                <Button style ={buttonStyle} color="primary" size="lg">Your Assignments</Button>
            </Link>
            <Link to={`${student_course_id}/notes`}>
                <Button style ={buttonStyle} color="primary" size="lg">Your Notes</Button>
            </Link>
            <FeedbackModal {...props} buttonLabel = {"Give Feedback"} className = {"feedback"} buttonStyle = {buttonStyle}/>
            <Container>
            <Card className="mt-3">
          <CardTitle className="text-center mt-3" >Discussion Forum </CardTitle>
        <Row>
          <Col md="4">
            <Card body>
              <form >
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Title"
                    name="Title"
                    type="text"
                    onChange = {changeTitle}
                    value = {title}
                  />
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Details (200 letters)"
                    name="Description"
                    rows="5"
                    onChange = {changeDescription}
                    value = {description}
                  />
                </div>


                <div className="form-group">
                  <button  className="btn btn-primary" onClick={discuss}>
                    Discuss &#10148;
                  </button>
                </div>
              </form>
          </Card>        
          </Col>
          <Col md="8">
            <Card body>
            <div className="commentList">
                {forumData.map(k => (

                    <div className="media mb-3">
                    <img
                    className="mr-3 bg-light rounded"
                    width="48"
                    height="48"
                    src={`https://api.adorable.io/avatars/48/abott@adorable.png`}
                    alt="Avatar"
                    />

                    <div className="media-body p-2 shadow-sm rounded bg-light border">
                    <p className="float-right text-muted">{timeago.format(k.created_at)} </p>
                    <h4 className = "mt-0 mb-1 text-muted">{ k.creator } </h4>
                    <h6 className="mt-1 mb-1 text-muted">{ k.title }</h6>
                    {k.description}
                    </div>
                    </div>

                ))}
                
                

            </div>
            </Card>
          </Col>
          </Row>
        </Card>
        </Container>

        </div>
    );

}
export default CourseContent;
