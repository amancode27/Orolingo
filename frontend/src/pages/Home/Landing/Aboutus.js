import React, { useState, useEffect } from 'react'
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckIcon from '@material-ui/icons/Check';



const useStyles = makeStyles((theme) => ({
    main:{
        widht:"100%",
        marginTop:theme.spacing(10),
    },
    container:{
        width:"100%"
    },
    img:{
        width:"100%",
        height:"80vh",
    },
    pad:{
      paddingTop:theme.spacing(2),  
      PaddingBottom:theme.spacing(2),
    },
    text:{
        marginTop:"10%",
    },
    plaintext:{
        fontSize:"1em",
    }
  }));

  

const img_src = "https://source.unsplash.com/800x800/?travel";

const Aboutus = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <Container className={classes.container}>
                <Grid container spacing={5} justify="space-around">
                    <Grid item xs={12} md={6}>
                        <img src={img_src} className={classes.img}></img>
                    </Grid>

                    <Grid item xs={12} md={6} >
                        <Typography variant="h1" className={classes.text}>About Us</Typography>
                        <LinearProgress variant="determinate" value={100}/>

                        <Typography  className={`${classes.plaintext}  ${classes.pad}`}>
                            Lorem ipsum dolor sit amet,
                            consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </Typography>


                        <Typography variant="h2" className={classes.pad}>Why Chose us?</Typography>
                        <Grid container spacing={2} xs={8}>
                            <Grid item xs={6} >
                                <Typography variant="h5"><CheckIcon/> We Are Better</Typography>
                                <Typography variant="h5"><CheckIcon/> We Are Better</Typography>
                                <Typography variant="h5"><CheckIcon/> We Are Better</Typography>
                                <Typography variant="h5"><CheckIcon/> We Are Better</Typography>
                                
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h5"><CheckIcon/> We Are Better</Typography>
                                <Typography variant="h5"><CheckIcon/> We Are Better</Typography>
                                <Typography variant="h5"><CheckIcon/> We Are Better</Typography>
                                <Typography variant="h5"><CheckIcon/> We Are Better</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
export default Aboutus