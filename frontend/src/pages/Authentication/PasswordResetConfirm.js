import React,{ useState, useEffect } from 'react';
import basename from "../Home/basename.js";
import axios from "axios";
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { Alert } from 'reactstrap';

const PasswordReset = (props) => {
    const [password,setPassword] = useState('');
    const [userid,setUserId] = useState('');
    const [token,setToken] = useState('');
    const [success,setSuccess]  = useState(false);
    const [error,setError]  = useState(false);
    const fieldChange = (e) =>{
        if(e.target.name == 'password'){
            setPassword(e.target.value);
        }
        else if(e.target.name == 'userid'){
            setUserId(e.target.value);
        }
        else{
            setToken(e.target.value);
        }
    }

    const submitForm = () =>{
        console.log(password,userid,token);
        axios.patch(`${basename}/auth/api/password-reset-complete/`,{
            "password":password,
            "token":token,
            "uidb64":userid,
        }).then(res=>{
            setSuccess(true);
        }).catch(err=>{
            console.log(err.response);
            setError(true); 
        })
    }

    const formstyle = {
        "width": "600px",
        "margin": "auto",
        "background-color": "lightsteelblue",
        "padding": "25px",
        "margin-top": "100px",
        "border-radius": "10px"
    }

    let e = <div></div>;
    if(success){
        e = <Alert color = "success">Password reset successfully! <a href = "http://localhost:3000/login">Click</a> here to login!</Alert>
    }
    else if(error){
        e = <Alert color = "danger">The token is already used! Please try again!</Alert>
    }

    return (
        <div>
        <Form style= {formstyle}>
            <FormGroup >
                <Label for="password">Password</Label>
                <Input size="lg" type="password" name="password" id="new_pass" placeholder="New Password" onChange={fieldChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="userid">Your ID</Label>
                <Input size="lg" type="text" name="userid" id="user_id" placeholder="ID" onChange={fieldChange}/>
            </FormGroup>
            <FormGroup>
                <Label for="token">Email</Label>
                <Input size="lg" type="text" name="token" id="token" placeholder="TOKEN" onChange={fieldChange}/>
            </FormGroup>
            {e}
            <Button size = "lg" onClick = {submitForm}>Submit</Button>
        </Form>
        </div>
    )
}

export default PasswordReset;