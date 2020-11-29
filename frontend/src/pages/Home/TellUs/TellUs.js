import React,{ useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import axios from "axios";
import './style.css';
import './roboto-font.css';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import basename from "../basename.js";
import useFullPageLoader from '../../../Components/FullPageLoader/useFullPageLoader.js';
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
  }
  
  const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      '& > * + *': {
        marginTop: theme.spacing(2),
      },
    },
  }));

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
    const [open, setOpen] = React.useState(false);
    const [openWarn, setOpenWarn] = React.useState(false);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpen(false);
    };

    const handleClickWarn = () => {
        setOpenWarn(true);
    };

    const handleCloseWarn = (event, reason) => {
        if (reason === 'clickaway') {
        return;
        }

        setOpenWarn(false);
    };



    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setFormData((prev) => {
            return { ...prev, [name]: value };
        });
    }

    const handleSubmit = (e) => {
        showLoader();
        if(formData['name']!="" && formData['email']!="" && formData['preference']!="" && formData['profile']!="" && formData['purpose']!="" && formData['lang_already']!="" && formData['lang_to_learn']!=""){
            axios.post(`${basename}/api/tellus/`,formData)
            .then((res) => {
                handleClick();
            });
        }
        else {
            handleClickWarn();
        }
    }
    const classes = useStyles();
    console.log(formData);

    return(
        <div>
            <div className={classes.root}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} >
                <Alert onClose={handleClose} severity="success" >
                <div style={{"fontSize":"15px"}}>Your Responses have been recorded! Thank You! </div>
                </Alert>
            </Snackbar>
            <Snackbar open={openWarn} autoHideDuration={6000} onClose={handleCloseWarn} >
                <Alert onClose={handleCloseWarn} severity="warning" >
                <div style={{"fontSize":"15px"}}>Failed to upload responses! Please Try again </div>
                </Alert>
            </Snackbar>
            </div>
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
					<input type="submit" class="register" onClick={ handleSubmit }/>
				</div>
			</form>
            </div>
            </div>
            </body>
        </div>
    )
}

export default TellUs;