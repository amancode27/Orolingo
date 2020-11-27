import React, { useState, useEffect } from 'react'
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles, withTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import MenuBookIcon from '@material-ui/icons/MenuBook';


const items = [
    {
        subheading:"Guidance",
        text:"Anyone has the ability to speak another language. Traditionally, the best way to learn was to move abroad and immerse yourself in a new language and culture, but that’s not always practical or affordable for many of us.",
        icon: "MenuBookOutlinedIcon",
    },
    {
        subheading:"Guidance",
        text:"Anyone has the ability to speak another language. Traditionally, the best way to learn was to move abroad and immerse yourself in a new language and culture, but that’s not always practical or affordable for many of us.",
        icon: "MenuBookOutlinedIcon",
    },
    {
        subheading:"Guidance",
        text:"Anyone has the ability to speak another language. Traditionally, the best way to learn was to move abroad and immerse yourself in a new language and culture, but that’s not always practical or affordable for many of us.",
        icon: "MenuBookOutlinedIcon",
    },
    {
        subheading:"Guidance",
        text:"Anyone has the ability to speak another language. Traditionally, the best way to learn was to move abroad and immerse yourself in a new language and culture, but that’s not always practical or affordable for many of us.",
        icon: "MenuBookOutlinedIcon",
    },
]

const useStyles = makeStyles((theme) => ({
    main:{
        marginTop:theme.spacing(10),
        backgroundColor:"#36454f",
        color:"white",
    },
    heading:{
        paddingTop:theme.spacing(3),
        fontSize:"3.5em"
    },
    progress:{
        padding:theme.spacing(2),
        borderRadius:"5px",
    },
    progressbar:{
        height:"10px",
        color:"#007FFF",
    },
    item:{
        padding:theme.spacing(4),
        height:"30vh",
    },
    subheading:{
        padding: theme.spacing(2),
    },
    icon:{
        height:"3em",
        width:"3em",
        color:"#007FFF",
    },
}));

const WhyLearn = (props) =>{
    const classes = useStyles();
    return(
        <div className={classes.main}>
            <Typography  align="center" className={classes.heading}>Why learn with us?</Typography>
            <div className={classes.progress}>        
                <LinearProgress variant="determinate" value={100} className={classes.progressbar}/>
            </div>
            <Container>
                <Grid container>
                    {items.map(e=>(
                    <Grid item key={e} xs={12} md={6} className={classes.item}>
                        <Typography variant ="h5" align="center"><MenuBookIcon className={classes.icon}/></Typography>
                        <Typography variant ="h2" align="center" className={classes.subheading}>{e.subheading}</Typography>
                        <Typography variant ="h5" align="center">{e.text}</Typography> 
                    </Grid>
                    ))}
                    <Grid item className={classes.subheading}>
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
export default WhyLearn