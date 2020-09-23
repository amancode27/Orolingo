import React, { useState, useEffect } from "react";
import { FormErrors } from './FormError';

import Fade from 'react-reveal/Fade';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import LoginForm from "./LoginForm";
import { Radio } from "@material-ui/core";

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://material-ui.com/">
                OrOlingo
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
            theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



const SignupForm = (props) => {
    const classes = useStyles();
    const [formdata, setFormdata] = useState({
        username: "",
        password: "",
        fullname: "",
        email: "",
        is_student: false,
        is_trainer: false,
        formErrors: { email: "", password: "", username: "", fullname: "", is_student: false, is_trainer: false },
        emailValid: false,
        passwordValid: false,
        usernameValid: false,
        fullnameValid: false,
        buttonValid: false,
        formValid: false,
    });

    const handleChange = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        if (name === "type") {
            if (value === "student") {
                name = "is_student";
                value = true;
            } else  {
                name = "is_trainer";
                value = true;
            }
        }

        validateField(name, value);
        setFormdata((prev) => {
            return { ...prev, [name]: value };
        });
    };

    function validateField(fieldName, value) {
        switch (fieldName) {
            case "email":
                formdata.emailValid = value.match(
                    /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
                );
                formdata.formErrors.email = formdata.emailValid ? "" : " is invalid";
                break;
            case "is_student":
                formdata.buttonValid = (value == true)
                formdata.formErrors.is_student = formdata.buttonValid ? "" : " please select if you are a student or a trainer";
                break;
            case "is_trainer":
                formdata.buttonValid = (value == true)
                formdata.formErrors.is_trainer = formdata.buttonValid ? "" : "  please select if you are a student or a trainer";
                break;
            case "username":
                formdata.usernameValid = value.length > 0;
                formdata.formErrors.username = formdata.usernameValid
                    ? ""
                    : " is required";
                break;
            case "fullname":
                formdata.fullnameValid = value.length > 0;
                formdata.formErrors.fullname = formdata.fullnameValid
                    ? ""
                    : " is required";
                break;
            case "password":
                formdata.passwordValid = value.length >= 6;
                formdata.formErrors.password = formdata.passwordValid
                    ? ""
                    : " is too short";
                break;
            default:
                break;
        }
        formdata.formValid =
            formdata.emailValid &&
            formdata.passwordValid &&
            formdata.usernameValid &&
            formdata.fullnameValid &&
            formdata.buttonValid;
    }

    function errorClass(error) {
        return error.length === 0 ? "" : "has-error";
    }
    return (
        <Fade right>
            <Grid container component="main" className={classes.root}>
                <CssBaseline />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <div className={classes.paper}>
                        <Avatar className={classes.avatar}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h3">
                            Sign Up
                    </Typography>
                        <form className={classes.form} onSubmit={(e) => props.handleSignup(e, formdata, props.history.push)}>
                            <div id="signup-form-error"></div>
                            <FormErrors formErrors={formdata.formErrors} />
                            <div className={`form-group ${errorClass(formdata.formErrors.username)}`}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    value={formdata.username}
                                    onChange={handleChange}
                                    autoComplete="username"
                                    autoFocus
                                />
                            </div>
                            <div className={`form-group ${errorClass(formdata.formErrors.password)}`}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formdata.password}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={`form-group ${errorClass(formdata.formErrors.fullname)}`}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="fullname"
                                    label="Fullname"
                                    autoComplete="Fullname"
                                    value={formdata.fullname}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className={`form-group ${errorClass(formdata.formErrors.email)}`}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    label="email"
                                    name="email"
                                    value={formdata.email}
                                    onChange={handleChange}
                                />
                            </div>
                            <input
                                className="form--input"
                                id="type-student"
                                type="radio"
                                name="type"
                                value="student"
                                onChange={handleChange}
                            />
                            <label className="form--label" htmlFor="type-student">
                                Student
                        </label>
                            <input
                                className="form--input"
                                id="type-trainer"
                                type="radio"
                                name="type"
                                value="trainer"
                                onChange={handleChange}
                            />
                            <label className="form--label" htmlFor="type-trainer">
                                Trainer
                        </label>
                            <Button
                                disabled={!formdata.formValid}
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                style={{ height: "50px", fontSize: "15px" }}

                            >
                                Sign Up
                        </Button>
                            <Grid container>
                                <Grid item>
                                    <Link href="/login" variant="body1">
                                        {"Sign In"}
                                    </Link>
                                </Grid>
                            </Grid>
                            <Box mt={5}>
                                <Copyright />
                            </Box>
                        </form>
                    </div>
                </Grid>
                <Grid item xs={false} sm={4} md={7} className={classes.image} />
            </Grid>
        </Fade>
    );
}

export default SignupForm