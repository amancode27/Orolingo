import React, { useState, useEffect } from "react";
import { FormErrors } from "./FormError";
import Fade from "react-reveal/Fade";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Paper from "@material-ui/core/Paper";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Alert from "@material-ui/lab/Alert";
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      <div style={{fontSize:'15px'}}>
      {"Copyright © "}
      <Link color="inherit" href="/">
        OrOlingo
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
      </div>
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
  },
  image: {
    backgroundImage: "url(/static/signup.jpg)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignupForm = (props) => {
  const classes = useStyles();
  const [profileVar, setProfileVar] = useState('');

  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
    confirm_password: "",
    fullname: "",
    email: "",
    is_student: false,
    is_trainer: false,
  });
  const [formdataerrors, setFormdataerrors] = useState({
    username: "",
    password: "",
    confirm_password: "",
    fullname: "",
    email: "",
    is_student: false,
    is_trainer: false,
  });

  const profileEvent = (eve, newProfile) => {
    setProfileVar(newProfile);
    if (newProfile === "student") {
      setFormdata((prev) => {
        return { ...prev, ['is_student']: true , ['is_trainer']:false };
    });
    } else {
      setFormdata((prev) => {
        return { ...prev, ['is_trainer']: true, ['is_student']: false };
    });
    }
}
  const handleChange = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "type") {
      if (value === "student") {
        name = "is_student";
        value = true;
      } else {
        name = "is_trainer";
        value = true;
      }
    }

    setFormdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      let data = {
        username: formdata.username,
        password: formdata.password,
        confirm_password: formdata.confirm_password,
        fullname: formdata.fullname,
        email: formdata.email,
        is_student: formdata.is_student,
        is_trainer: formdata.is_trainer,
      };

      formdata["username"] = "";
      formdata["password"] = "";
      formdata["cofirm_password"] = "";
      formdata["fullname"] = "";
      formdata["email"] = "";
      formdata["is_student"] = false;
      formdata["is_trainer"] = false;
      setFormdata(formdata);
      props.handleSignup(event, data, props.history.push);
    }
  };

  const validate = () => {
    let errors = {
      username: "",
      password: "",
      confirm_password: "",
      fullname: "",
      email: "",
      is_student: false,
      is_trainer: false,
    };

    let isValid = true;

    if (!formdata["username"]) {
      isValid = false;
      errors["username"] = "Please enter your username.";
    }
    if (!formdata["password"]) {
      isValid = false;
      errors["password"] = "Please enter your password.";
    }
    if (formdata["password"].length < 8) {
      isValid = false;
      errors["password"] = "password must be 8 characters long.";
    }
    var letter = /[a-zA-Z]/;
    var number = /[0-9]/;
    if (
      !number.test(formdata["password"]) ||
      !letter.test(formdata["password"])
    ) {
      isValid = false;
      errors["password"] = "Password must be alphanumeric";
    } //match a letter _and_ a number

    if (!formdata["confirm_password"]) {
      isValid = false;
      errors["confirm_password"] = "Please enter your confirm password.";
    }

    if (
      typeof formdata["password"] !== "undefined" &&
      typeof formdata["confirm_password"] !== "undefined"
    ) {
      if (formdata["password"] != formdata["confirm_password"]) {
        isValid = false;
        errors["password"] = "Passwords don't match.";
      }
    }

    if (!formdata["fullname"]) {
      isValid = false;
      errors["fullname"] = "Please enter your fullname";
    }
    if (!formdata["fullname"]) {
      isValid = false;
      errors["fullname"] = "Please enter your fullname";
    }
    var pattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );

    if (!pattern.test(formdata["email"])) {
      isValid = false;

      errors["email"] = "Please enter valid email address.";
    }

    if (!formdata["is_student"] && !formdata["is_trainer"]) {
        isValid = false;
        errors["is_student"] = "Please select either the Student or the Trainer";
        
      }

    setFormdataerrors(errors);

    return isValid;
  };

  // function validateField(fieldName, value) {
  //     switch (fieldName) {
  //         case "email":
  //             formdata.emailValid = value.match(
  //                 /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i
  //             );
  //             formdata.formErrors.email = formdata.emailValid ? "" : " is invalid";
  //             break;
  //         case "is_student":
  //             formdata.buttonValid = (value == true)
  //             formdata.formErrors.is_student = formdata.buttonValid ? "" : " please select if you are a student or a trainer";
  //             break;
  //         case "is_trainer":
  //             formdata.buttonValid = (value == true)
  //             formdata.formErrors.is_trainer = formdata.buttonValid ? "" : "  please select if you are a student or a trainer";
  //             break;
  //         case "username":
  //             formdata.usernameValid = value.length > 0;
  //             formdata.formErrors.username = formdata.usernameValid
  //                 ? ""
  //                 : " is required";
  //             break;
  //         case "fullname":
  //             formdata.fullnameValid = value.length > 0;
  //             formdata.formErrors.fullname = formdata.fullnameValid
  //                 ? ""
  //                 : " is required";
  //             break;
  //         case "password":
  //             formdata.passwordValid = value.length >= 6;
  //             formdata.formErrors.password = formdata.passwordValid
  //                 ? ""
  //                 : " is too short";
  //             break;
  //         default:
  //             break;
  //     }
  //     formdata.formValid =
  //         formdata.emailValid &&
  //         formdata.passwordValid &&
  //         formdata.usernameValid &&
  //         formdata.fullnameValid &&
  //         formdata.buttonValid;
  // }

  // function errorClass(error) {
  //     return error.length === 0 ? "" : "has-error";
  // }

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

            <form className={classes.form} onSubmit={handleSubmit}>
              {props.error1 ==
              "Something went wrong. Please try again later." ? (
                <Alert severity="info" id="signup-form-error"></Alert>
              ) : null}
              {/* <FormErrors formErrors={formdata.formErrors} /> */}
              <div>
                {formdataerrors["username"] != "" ? (
                  <Alert severity="info">{formdataerrors.username}</Alert>
                ) : null}
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
              <div>
                {formdataerrors["password"] != "" ? (
                  <Alert severity="info">{formdataerrors.password}</Alert>
                ) : null}
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
              </div>{" "}
              <div>
                {formdataerrors["confirm_password"] != "" ? (
                  <Alert severity="info">
                    {formdataerrors.confirm_password}
                  </Alert>
                ) : null}
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  name="confirm_password"
                  label="Confirm Password"
                  type="password"
                  id="confirm_password"
                  autoComplete="confirm_password"
                  value={formdata.confirm_password}
                  onChange={handleChange}
                />
              </div>
              {formdataerrors["fullname"] != "" ? (
                  <Alert severity="info">
                    {formdataerrors.fullname}
                  </Alert>
                ) : null}
              <div>
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
              {formdataerrors["email"] != "" ? (
                  <Alert severity="info">
                    {formdataerrors.email}
                  </Alert>
                ) : null}
              <div>
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
              {formdataerrors["is_student"] != "" ? (
                  <Alert severity="info">
                    {formdataerrors.is_student}
                  </Alert>
                ) : null}
                <ToggleButtonGroup size="medium"  value={profileVar} exclusive onChange={ profileEvent }>
                        <ToggleButton  value="student">
                            <div style={{fontSize : '15px'}}>Student </div>
                        </ToggleButton>
                        <ToggleButton value="trainer">
                            <div style={{fontSize : '15px'}}>Trainer </div>
                        </ToggleButton> 
                    </ToggleButtonGroup>
              <Button
                // disabled={!formdata.formValid}
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
                  <Link href="/login" variant="body1" style={{ textDecoration:'None'}}>
                  <div style={{fontSize:'15px'}}>
                  {"Sign In"}
                  </div>
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
};

export default SignupForm;
