import React, { useState, useEffect } from "react";
import basename from "../Home/basename.js";
import axios from "axios";
import { Col,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../style/CreateCourse.css';
import { Redirect } from "react-router";

const CreateCourse = (props) =>{
    const [courseDetails,setCourseDetails] = useState({});
    const [redirect,setRedirect] = useState(false);
    const changeField = (e) =>{
        const field = e.target.name;
        const value = e.target.value;
        setCourseDetails(prev=>{
            return {...prev,[field]:value};
        })
    }
    const submitForm = () =>{
        const user_id = props.userId;
        axios.get(`${basename}/api/trainer/?user=${user_id}`)
             .then(res1=>{
                 axios.get(`${basename}/api/language/?name=${courseDetails['language']}`)
                      .then(res2=>{
                            if(!res2.data.objects.length){
                                axios.post(`${basename}/api/language/`,{
                                    'name':courseDetails['language']
                                }).then(()=>{
                                    axios.get(`${basename}/api/language/?name=${courseDetails['language']}`)
                                         .then(res3=>{
                                            axios.post(`${basename}/api/course/`,{
                                                "language":res3.data.objects[0],
                                                "name":courseDetails['name'],
                                                "trainer":res1.data.objects[0],
                                                "startdate":courseDetails['startdate'] ,
                                                "enddate": courseDetails['enddate'],
                                                "description":courseDetails['description'],
                                            }).then((res)=>{
                                                setRedirect(true);})
                                         })
                                })
                            }
                            else{
                                axios.post(`${basename}/api/course/`,{
                                    "language":res2.data.objects[0],
                                    "name":courseDetails['name'],
                                    "trainer":res1.data.objects[0],
                                    "startdate":courseDetails['startdate'] ,
                                    "enddate": courseDetails['enddate'],
                                    "description":courseDetails['description'],
                                }).then((res)=>{
                                    setRedirect(true);})
                            }
                      })
             })
        
    }
    if(redirect){
        return <Redirect to={`/dashboard`} />
    }
    return (
        <div className='formcss'>
            <Form>
                <FormGroup>
                    <Label for="courseName">Course Name</Label>
                    <Input type="text" name="name" id="courseName" placeholder="Enter a course name" bsSize="lg" onChange={changeField}/>
                </FormGroup>
                <FormGroup>
                    <Label for="language">Language</Label>
                    <Input type="text" name="language" id="language" placeholder="Enter the language" size="lg" onChange={changeField}/>
                </FormGroup>
                <FormGroup>
                    <Label for="startDate">Start Date</Label>
                    <Input
                    type="date"
                    name="startdate"
                    id="startDate"
                    placeholder="date placeholder"
                    size="lg"
                    onChange={changeField}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="endDate">End Date</Label>
                    <Input
                    type="date"
                    name="enddate"
                    id="endDate"
                    placeholder="date placeholder"
                    size="lg"
                    onChange={changeField}
                    />
                </FormGroup>
                <FormGroup>
                    <Label for="description">Course Description</Label>
                    <Input type="textarea" name="description" id="description" bsSize="lg" onChange={changeField}/>
                </FormGroup>
                <Button size="lg" onClick={submitForm}>Submit</Button>
            </Form>
        </div>
    );
}

export default CreateCourse;