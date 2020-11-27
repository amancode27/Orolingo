
import React,{ useState, useEffect } from 'react'
import axios from "axios";
import Teams from './Teams.js';
import Aboutus from './Aboutus.js';
import { Container, Grid ,makeStyles,Typography} from '@material-ui/core';
import WhyLearn from './whylearn.js';


const useStyles = makeStyles((theme) => ({
  main:{
    backgroundColor:"white",
    width:"100%",
  },
  pad:{
    PaddingBottom:theme.spacing(10),
  },
  container:{
    width:"100%",
  }
}));

const Landing = props => {
  const classes = useStyles();
  return (
    <div className={classes.main}>
      <Container>
        <Grid container padding={5}>
          <Grid item  xs={12}>
            <Aboutus className={classes.pad}/>
          </Grid>
          <Grid item className={classes.pad} xs={12}>
            <WhyLearn/>
          </Grid>
        </Grid>
      </Container>
      <button onClick={props.handleLogout}>Logout</button>
    </div>
  )
}

export default Landing
