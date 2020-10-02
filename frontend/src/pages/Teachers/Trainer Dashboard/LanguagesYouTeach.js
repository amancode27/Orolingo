import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TranslateOutlinedIcon from '@material-ui/icons/TranslateOutlined';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    cardheader: {
        fontSize: "4em",
        textAlign: "center",
        backgroundColor: "#757ce8",
        color: "white",
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardContent: {
        flexGrow: 1,
    },
    root: {
        display: 'flex',
        backgroundColor: "#eeeeee",
    },
}));

const LanguagesYouTeach = (props) => {
    const languages = props.languages;
    const classes = useStyles();

    return (
        <Grid item xs={12} sm={8}>
            <Card className={classes.cardheader} >
                <Typography gutterBottom variant="h4" component="h2" >
                    Languages You Teach
                                </Typography>
            </Card>
            <div>
                <Grid container xs={12} spacing={0}>
                    {Object.keys(languages).map(e => (
                        <Grid item key={e} xs={12} >
                            <Card className={classes.card} style={{ width: '100%', textAlign: 'center' }}>
                                <CardContent className={classes.cardContent} >
                                    <Typography gutterBottom variant="h5" component="h2">
                                        <Link to={`dashboard/trainercourses/${e}`}>
                                            <TranslateOutlinedIcon /> {e}
                                        </Link>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </div>
        </Grid>
    )
}
export default LanguagesYouTeach