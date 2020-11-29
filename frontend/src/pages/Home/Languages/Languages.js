import React, { useState, useEffect } from 'react'
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { lorem } from 'faker';
import CssBaseline from '@material-ui/core/CssBaseline';
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckIcon from '@material-ui/icons/Check';

const items = [
    {
        title: "French",
        src: "static/french1.jpg",
        text: lorem.words(60),
    },
    {
        title: "English",
        src: "static/french2.jpg",
        text: lorem.words(60),
    },
]

const useStyles = makeStyles((theme) => ({
    main: {
        width: "100%",
        backgroundColor:"#33CCFF",
    },
    container: {
        padding: theme.spacing(4),
    },
    img: {
        height: "50vh",
        width: "50vh",
        objectFit: "center",
    },
    text: {
        fontSize: "1em",
        marginTop:theme.spacing(2),
    },
    subtext: {
        fontSize: "1.5em",
        marginTop:theme.spacing(2),
        fontWeight:"200",
        lineHeight:"25px",
        color:"white",
    },
    justify: {
        alignItems: "center",
    },
    item:{
        marginTop:"10vh",
    },
    item_text:{
        backgroundColor:"white",
        boxShadow:"5px 10px 10px rgba(169 169 160)",
        padding:theme.spacing(4),
        borderRadius:theme.spacing(4),
    },
}));

const Languages = (props) => {
    const classes = useStyles();
    return (
        <div className={classes.main}>
            <Container className={classes.container} maxWidth="100%">
                <Grid conatiner justify="center" align="center">
                    <Grid item xs={12}>
                        <Typography align="center" variant="h1"><strong>Languages We Teach</strong></Typography>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography align="left" className={classes.subtext}>{lorem.words(60)}</Typography>
                    </Grid>
                    <Grid item xs={12} align="center" >
                        {items.map(e => (
                            <Grid container maxwidth="md" className={classes.item}>
                                <Grid item md={6} className={classes.justify}>
                                    <img src={e.src} className={classes.img}></img>
                                </Grid>
                                <Grid item md={5} className={classes.item_text}>
                                    <Typography align="center" variant="h2"><strong>{e.title}</strong></Typography>
                                    <Typography align="left" className={classes.text}>{e.text}{e.text}</Typography>
                                </Grid>
                            </Grid>
                        ))}
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}

export default Languages