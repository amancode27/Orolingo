import React, { useState, useEffect } from "react";
import FacebookLogin from "react-facebook-login";
import { GoogleLogin } from "react-google-login";
import { FormErrors } from './FormError';

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

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="/">
        OrOlingo
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    height: '93vh',
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



const LoginForm = (props) =>{
  const classes = useStyles();

  const [formdata, setFormdata] = useState({
    username: "",
    password: "",
    passwordValid: false,
    usernameValid: false,
    formErrors: { password: '', username: ''},
    formValid: false
  });

  const [checked, setChecked] = useState(false);

  const handleCheckbox = () => {
    setChecked((prev) => !prev);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormdata((prev) => {
      return { ...prev, [name]: value };
    });
    validateField(name, value)
  };
  function validateField(fieldName, value) {


    switch (fieldName) {

      case 'username':
        formdata.usernameValid = value.length>0;
        formdata.formErrors.username = formdata.usernameValid ? '' : ' is required';
        break;

      case 'password':
        formdata.passwordValid = value.length > 0;
        formdata.formErrors.password = formdata.passwordValid ? '' : ' is required';
        break;
      default:
        break;
    }
    formdata.formValid = formdata.passwordValid && formdata.usernameValid;


  }
  function errorClass(error) {
    return(error.length === 0 ? '' : 'has-error');
  }



  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h3" >
            Sign in
          </Typography>
            <form className={classes.form} onSubmit={(e) => props.handleLogin(e, formdata, props.history.push)}>
            <div id="login-form-error"></div>
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
              value={formdata.password}
              onChange={handleChange}
              autoComplete="current-password"
            />
            </div>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label = "Keep me signed in"
              onClick={handleCheckbox}
            />
            <Button
              disabled={!formdata.formValid}
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              style={{height:"50px", fontSize: "15px"}}
            >
              Sign In
            </Button>
            <Typography component="h1" variant="h5">
                Or Sign In With
            </Typography>
            <div className="login-icons">
              <FacebookLogin
                appId="295694501865260"
                autoLoad={false}
                fields="name,email,picture"
                callback={(response) => props.handleSocialLogin(response, 'facebook', props.history.push)}
              />
              <GoogleLogin
                clientId="459086212681-76d4i3recuslqf1juh4vt86mbngqou6c.apps.googleusercontent.com"
                buttonText="Login"
                onSuccess={(response) => props.handleSocialLogin(response, 'google-oauth2', props.history.push)}
                onFailure={(response) => props.handleSocialLogin(response, 'google-oauth2', props.history.push)}
              />
            </div>
            <Grid container>
              <Grid item xs style={{marginTop:"10px"}}>
                <Link href="#" variant="body1">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item style={{marginTop:"10px"}}>
                <Link href="/signup" variant="body1">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
}
export default LoginForm