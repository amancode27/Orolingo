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
    Jumbotron,
  } from "reactstrap";
  import * as timeago from 'timeago.js';
  

const CourseContent = (props,user) =>{
    
      const student_course_id = props.match.params['id'];

      console.log(props.match.params["course"]);

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
        const tmp = res.data.objects;
        setForumData(res.data); 
      });
    },[props] );

    //console.log(forumData);

    return (
        
        <div>
          <Jumbotron>
            <h1 className="display-1 text-center">"Course Name"</h1>
            <hr className="my-2" />
            <Container className = "mt-5">
            <Row>
              <Col md="4">
                <Card>
                  <CardBody>
                    <CardTitle>Your Assignments </CardTitle>
                  </CardBody>
                  <img width="100%" src="https://source.unsplash.com/318x180" alt="Card image cap" />
                  <CardBody>
                    <CardText>Your Course Assignments are available here ! </CardText>
                    <Link to={`${student_course_id}/assignments`}>
                      <Button   color="primary" >Your Assignments</Button>
                    </Link>
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <CardBody>
                    <CardTitle>Feed Back </CardTitle>
                  </CardBody>
                  <img width="100%" src="https://source.unsplash.com/320x180" alt="Card image cap" />
                  <CardBody>
                    <CardText>Give your feed back here... </CardText>
                        <FeedbackModal {...props} buttonLabel = {"Give Feedback"} className = {"feedback"} />
                    
                  </CardBody>
                </Card>
              </Col>
              <Col md="4">
                <Card>
                  <CardBody>
                    <CardTitle>Your Notes </CardTitle>
                  </CardBody>
                  <img width="100%" src="https://source.unsplash.com/318x180" alt="Card image cap" />
                  <CardBody>
                    <CardText>Your Notes are available here ! </CardText>
                    <Link to={`${student_course_id}/notes`}>
                      <Button  color="primary">Your notes</Button>
                    </Link>
                  </CardBody>
                </Card>
              </Col>
            </Row>
            </Container>
            
          </Jumbotron>

          <Card >  
          <Container>
          <CardTitle className="text-center mt-3" >Discussion Forum </CardTitle>
          
          <Col>
            <div className="commentList">
                {forumData.map(k => (

                    <div className="media mb-3">
                    <img
                    className="mr-3 bg-light rounded"
                    width="48"
                    height="48"
                    src={`https://livechat.s3.amazonaws.com/default/avatars/male_8.jpg`}
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
          </Col>
          <CardTitle className="text-center mt-3" > Ask your Doubts here ... </CardTitle>
          <Col>
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
          </Col>
          </Container>

        </Card>

        </div>
    );

}
export default CourseContent;