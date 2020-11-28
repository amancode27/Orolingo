
import React,{ useState, useEffect } from 'react'
import axios from "axios";
import Teams from './Teams.js';
import Aboutus from './Aboutus.js';
import { Container, Grid ,makeStyles,Typography} from '@material-ui/core';
import WhyLearn from './whylearn.js';
import Header from './Header.js';


const useStyles = makeStyles((theme) => ({
  main:{
    backgroundColor:"white",
    width:"100%",
  },
  container:{
    display:"flex",
    width:"100%",
    padding:"0",
  }
}));

const Landing = props => {
  const classes = useStyles();
  return (
    <section className={classes.main}>
      <Container className={classes.container} maxWidth="100%">
        <Grid container>
        <Grid item xs={12}>
            <Header />
          </Grid>
          <Grid item xs={12}>
            <Aboutus />
          </Grid>
          <Grid item xs={12}>
            <WhyLearn/>
          </Grid>
        </Grid>
      </Container>
      <button onClick={props.handleLogout}>Logout</button>
    </section>
  )
}

export default Landing
