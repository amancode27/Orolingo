import React, { useState, useEffect } from 'react'
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';


const img_src = "https://source.unsplash.com/1200x800/?landscape"
const useStyles = makeStyles((theme) => ({
    main:{
        backgroundColor:"#36454f",
        color:"white",
        height:"100vh",
        width:"100%",
    },
    img:{
        position:"relative",
        height:"100vh",
        width:"100%",
        opacity:"0.5",
    },
    header:{
        position: "absolute",
        top:"50%",
    },
}));

const Header = (props) =>{
    const classes = useStyles();
    return(
        <div className={classes.main}>
            <img src={img_src} className={classes.img}></img>
            <Container>
                <Grid container>
                    <Grid item className={classes.header}>
                        <Typography variant="h1" style={{color:'rgba(179, 255, 0, 0.918)'}} >Orolingo</Typography>
                        <Typography variant="h2">Where languages meet.</Typography>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
export default Header;