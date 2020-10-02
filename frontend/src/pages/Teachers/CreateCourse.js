import React, { useState, useEffect } from "react";
import basename from "../Home/basename.js";
import axios from "axios";
import { Col,Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../style/CreateCourse.css';
import { Redirect } from "react-router";
import useFullPageLoader from '../../Components/FullPageLoader/useFullPageLoader.js';

const CreateCourse = (props) =>{
    const [courseDetails,setCourseDetails] = useState({});
    const [redirect,setRedirect] = useState(false);
    const [languages,setLanguages] = useState([]);
    const [loader,showLoader,hideLoader] = useFullPageLoader();

    useEffect(()=>{
        axios.get(`${basename}/api/language`)
        .then(res =>{
            setLanguages(res.data.objects);
        })
    },[props])
    
    console.log(languages);

    const changeField = (e) =>{
        const field = e.target.name;
        const value = e.target.value;
        setCourseDetails(prev=>{
            return {...prev,[field]:value};
        })
    }
    const submitForm = () =>{
        showLoader();
        const user_id = props.userId;
        axios.get(`${basename}/api/trainer/?user=${user_id}`)
             .then(res1=>{
                 hideLoader();
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
                                                "cost":courseDetails['cost'],
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
                                    "cost":courseDetails['cost'],
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
                    
                    <Input 
                        type="text" 
                        name="language" 
                        id="language" 
                        placeholder="Enter the language" 
                        size="lg" 
                        list="languagename" 
                        onChange={changeField}
                    />
                    {/* <select 
                        onChange={changeField}
                        name="language" 
                        value="language"
                    >
                    {languages.map(e=>{
                        <option value={e.name}>{e.name}</option>
                    })}        
                    </select>  */}
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
                    <Label for="cost">Purchase Amount</Label>
                    <Input type="text" name="cost" id="cost" placeholder="Enter the purchase amount" size="lg" onChange={changeField}/>
                </FormGroup>
                <FormGroup>
                    <Label for="description">Course Description</Label>
                    <Input type="textarea" name="description" id="description" bsSize="lg" onChange={changeField}/>
                </FormGroup>
                <Button size="lg" onClick={submitForm}>Submit</Button>
            </Form>
            {loader}
        </div>
    );
}

export default CreateCourse;