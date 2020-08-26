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
  

const CourseContent = (props,user) =>{
    const buttonStyle = {
        width:"300px",
        fontSize:"20px",
        fontFamily: "sans-serif",
        height:"50px",
        marginLeft:"50px",
        borderRadius:"10px"
      };
      const course_id = props.match.params['id'];

      const [forumData, setForumData] = useState([]);
      const [name, setName] = useState("");
      const [description, setDescription] = useState("");
      const changeName = (e) => {
          setName(e.target.value);
          
      }

      const changeDescription = (e) => {
            setDescription(e.target.value);
      }
      const discuss = (e) => {
        axios.post(`${basename}/auth/api/forum/create/`,{
            "name" : name,
            "description" : description
        })
        .then((res) => console.log(res));
      }

    useEffect(() => {
        
      axios.
      get(`${basename}/auth/api/forum`)
      .then((res) => {
        //console.log(res.data);
        setForumData(res.data); 
         
      });

      
    },[props]);

    //console.log(forumData);

    return (
        
        <div>
            <Link to={`${course_id}/assignments`}>
                <Button style ={buttonStyle} color="primary" size="lg">Your Assignments</Button>
            </Link>
            <Link to={`${course_id}/notes`}>
                <Button style ={buttonStyle} color="primary" size="lg">Your Notes</Button>
            </Link>
            <FeedbackModal {...props} buttonLabel = {"Give Feedback"} className = {"feedback"} buttonStyle = {buttonStyle}/>
            <Card className="mt-3">
          <CardTitle className="text-center mt-3" >Discussion Forum </CardTitle>
        <Row>
          <Col md="4">
            <Card body>
              <form >
                <div className="form-group">
                  <input
                    className="form-control"
                    placeholder="Name"
                    name="Name"
                    type="text"
                    onChange = {changeName}
                  />
                </div>

                <div className="form-group">
                  <textarea
                    className="form-control"
                    placeholder="Details "
                    name="Description"
                    rows="5"
                    onChange = {changeDescription}
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
                    {/* <small className="float-right text-muted">{k.last_activity["naturaltime"]} </small> */}
                    <h6 className="mt-0 mb-1 text-muted">{ k.name }</h6>
                    {k.description}
                    </div>
                    </div>

                ))}
                
                

            </div>
            </Card>
          </Col>
          </Row>
        </Card>
        

        </div>
    );

}
export default CourseContent;
