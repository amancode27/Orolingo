import React,{ useState, useEffect } from 'react'
import axios from "axios";
import './style.css';
import './roboto-font.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import basename from "./../Home/basename.js";
import useFullPageLoader from '../../Components/FullPageLoader/useFullPageLoader.js';


const TellUs = (props) => {

    const [loader,showLoader,hideLoader] = useFullPageLoader();

    const [formData, setFormData] = useState({
        name:"",
        email:"",
        lang_to_learn:"",
        purpose : "",
        lang_already : "",
        preference : "",
        profile : "",
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => {
            return { ...prev, [name]: value };
        });
    }

    const handleSubmit = (e) => {
        showLoader();
        axios.post(`${basename}/api/tellus/`,{
            "name":formData['name'],
            "email": formData['email'],
            "lang_already": formData['lang_already'],
            "lang_to_learn": formData['lang_to_learn'],
            "preference": formData['preference'],
            "profile": formData['profile'],
            "purpose": formData['purpose'],
        })
        .then((res) => {
            setFormData({
                name:"",
                email:"",
                lang_to_learn:"",
                purpose : "",
                lang_already : "",
                preference : "",
                profile : "",
            })
        });

    }
    
    console.log(formData);

    return(
        <div>
            <body class="form-v2">
            <div class="page-content">
            <div class="form-v2-content">
            <div class="form-left">
				<img src="\static\tellus.jpg" alt="form" />
				<div class="text-1">
					<p>Tell Us about yourself<span>Fill in the details</span></p>
				</div>
				<div class="text-2">
                    <a href="/" style={{textDecoration:'none'}}>
					<p><span>Orolingo</span>.com</p>
                    </a>
				</div>
			</div>
            <form class="form-detail" id="myform"  >
				<h1>Tell Us</h1>
				<div class="form-row">
					<label for="name">Full Name:</label>
					<input type="text" name="name" id="full_name" class="input-text" placeholder="ex: Lindsey Wilson" required onChange={handleChange} />
				</div>
				<div class="form-row">
					<label for="email">Your Email:</label>
					<input type="text" name="email" id="your_email" class="input-text" placeholder="ex: xyz@gamil.com" onChange={handleChange} required pattern="[^@]+@[^@]+.[a-zA-Z]{2,6}" />
				</div>
				<div class="form-row">
					<label for="full-name">Languages You want to learn:</label>
					<input type="text" name="lang_to_learn" id="full_name" class="input-text" onChange={handleChange} required placeholder="ex: German, French" />
				</div>
                <div class="form-row">
					<label for="full-name">Purpose for learning a new language:</label>
					<input type="text" name="purpose" id="full_name" class="input-text" onChange={handleChange} required placeholder="ex: Travel, jobs" />
				</div>
                <div class="form-row">
					<label for="full-name">Languages You already know:</label>
					<input type="text" name="lang_already" id="full_name" class="input-text" onChange={handleChange} required placeholder=" ex:English, Hindi" />
				</div> 
                <div class="form-row">
					<label for="full-name">Preferences:</label>
					<input type="text" name="preference"  class="input-text" onChange={handleChange} required placeholder="ex: Mr. X " />
				</div>
                    <div className="radio">
					<label for="full-name">Profile:</label>
                    <FormControl component="fieldset" >
                    <RadioGroup row aria-label="profile" >
                        <FormControlLabel
                        className="input-text"
                        id="type-student"
                        name="profile"
                        value="student"
                        onChange={handleChange}
                        control={<Radio color="primary" />}
                        label="Student"
                        labelPlacement="bottom"
                        htmlFor="type-student"
                        />
                        <FormControlLabel
                        className="input-text"
                        id="type-trainer"
                        name="profile"
                        value="trainer"
                        onChange={handleChange}
                        control={<Radio color="primary" />}
                        label="Trainer"
                        labelPlacement="bottom"
                        htmlFor="type-trainer"
                        />

                </RadioGroup>
                </FormControl>
                </div>
				<div class="form-row-last">
					<input type="submit" name="register" class="register" value="Register" onClick={ handleSubmit }/>
				</div>
			</form>
            </div>
            </div>
            </body>
        </div>
    )
}

export default TellUs;