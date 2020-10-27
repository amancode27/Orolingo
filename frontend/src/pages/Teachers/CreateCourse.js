import React, { useState, useEffect } from "react";
import basename from "../Home/basename.js";
import axios from "axios";
import { Col,Button, Form, FormGroup, Label, Input, FormText, Alert } from 'reactstrap';
import '../style/CreateCourse.css';
import { Redirect } from "react-router";
import useFullPageLoader from '../../Components/FullPageLoader/useFullPageLoader.js';

const CreateCourse = (props) =>{
    const [courseDetails,setCourseDetails] = useState({"language":"Bengali"});
    const [redirect,setRedirect] = useState(false);
    //const [languages,setLanguages] = useState();
    let languages = ["Bengali","English","French","Tamil","English","Chinese","Japanese"];
    const [loader,showLoader,hideLoader] = useFullPageLoader();
    const [amount_err,setAmount_err] = useState(false);
    const [name_err,setName_err] = useState(false);
    const [date_err,setDate_err] = useState(false);
    const [description_err,setDescription_err] = useState(false)


    const character_set ={
        '!':1,
        '@':1,
        '#':1,
        '&':1,
        '(':1,
        ')':1,
        '"':1,
        "'":1,
        ' ':1,
        '-':1
    }

    const error_string = "Only allowed character set is { a-z , A-Z , 0-9 , ! , @ , # , ( , ) , ' , - " +', " }!'; 

    // useEffect(()=>{
    //     axios.get(`${basename}/api/language`)
    //     .then(res =>{
    //         setLanguages(res.data.objects);
    //     })
    // },[props])
    

    const changeField = (e) =>{
        const field = e.target.name;
        const value = e.target.value;
        console.log(value);
        setCourseDetails(prev=>{
            return {...prev,[field]:value};
        })
        console.log(courseDetails);
        if(e.target.name == "name"){
            let name = e.target.value;
            if(name)
            {
                let f=false;
                for(let i=0;i<name.length;++i){
                    if(!((name[i]>='a'&&name[i]<='z')||(name[i]>='A'&&name[i]<='Z')||(name[i]>='0'&&name[i]<='9')||character_set[name[i]])){
                        f=true;
                        break;
                    }
                }
                if(f)
                    setName_err(true);
                else
                    setName_err(false);
            }
        }
        if(e.target.name == "description"){
            let description = e.target.value;
            if(description)
            {
                let f=false;
                for(let i=0;i<description.length;++i){
                    if(!((description[i]>='a'&&description[i]<='z')||(description[i]>='A'&&description[i]<='Z')||(description[i]>='0'&&description[i]<='9')||description[i]==','||character_set[description[i]])){
                        f=true;
                        break;
                    }
                }
                if(f)
                    setDescription_err(true);
                else
                    setDescription_err(false);
            }
        }
        if(e.target.name == 'cost'){
            let amount = e.target.value ;
            if(isNaN(amount)&&amount){
                setAmount_err(true);
            }
            else{
                setAmount_err(false);
            }
        }
        let start_date = document.getElementById("startDate").value;
        let end_date = document.getElementById("endDate").value;
        start_date = Date.parse(start_date);
        end_date = Date.parse(end_date);

        if(start_date&&end_date&&(end_date<start_date)){
             setDate_err(true);
        }
        else
            setDate_err(false);
        

    }
    const submitForm = (e) =>{
        // showLoader();
        e.preventDefault();
        const user_id = props.userId;
        if(amount_err||name_err||description_err||date_err)
            return;
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
    let err1,err2,err3,err4;
    if(amount_err){
        err1 = (
            <Alert color="danger" style={{"marginTop":"20px"}}>Please enter valid amount!</Alert>
        )
    }
    else{
        err1 = (<div></div>)
    }

    if(name_err){
        err2 = (
            <Alert color="danger" style={{"marginTop":"20px"}}>{error_string}</Alert>
        )
    }
    else{
        err2 = (<div></div>)
    }

    if(description_err){
        err3 = (
        <Alert color="danger" style={{"marginTop":"20px"}}>{error_string}</Alert>
        )
    }
    else{
        err3 = (<div></div>)
    }

    if(date_err){
        err4 = (
            <Alert color="danger" style={{"marginTop":"20px"}}>Start Date can't be before End Date!</Alert>
        )
    }
    else
        err4 = (<div></div>);

    if(redirect){
        return <Redirect to={`/dashboard`} />
    }
    return (
        <div className='formcss'>
            <Form onSubmit={submitForm}> 
                <FormGroup>
                    <Label for="courseName">Course Name</Label>
                    <Input type="text" name="name" id="courseName" placeholder="Enter a course name" bsSize="lg" onChange={changeField} required/>
                    {err2}
                </FormGroup>
                <FormGroup>
                    
                    <Label for="language">Language</Label>
                
                    <Input type="select" 
                        onChange={changeField}
                        name="language" 
                        value={courseDetails['language']}
                        size="lg"
                    >
                        {languages.map(e=>
                            (<option value={e}>{e}</option>)
                        )}        
                    </Input> 
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
                    required
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
                    required
                    />
                    {err4}
                </FormGroup>
                <FormGroup>
                    <Label for="cost">Purchase Amount</Label>
                    <Input type="text" name="cost" id="cost" placeholder="Enter the purchase amount" size="lg" onChange={changeField} required/>
                    {err1}
                </FormGroup>
                <FormGroup>
                    <Label for="description">Course Description</Label>
                    <Input type="textarea" name="description" id="description" bsSize="lg" onChange={changeField} required/>

                    {err3}
                </FormGroup>
                <Button size="lg" type="submit" >Submit</Button>
            </Form>
            {/* {loader} */}
        </div>
    );
}

export default CreateCourse;