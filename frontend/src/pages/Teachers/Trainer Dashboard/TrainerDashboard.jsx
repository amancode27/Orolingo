import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import basename from "../../Home/basename.js";
import axios from "axios";


import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useFullPageLoader from '../../../Components/FullPageLoader/useFullPageLoader.js';


// PAGES Import //
import LiveCourses from "./LiveCourses.js";
import UpcomingCourses from "./UpcomingCourses.js";
import LanguagesYouTeach from "./LanguagesYouTeach";
import Notifications from "./Notifications"
import Drawer from "./Drawer";

const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    root: {
        display: 'flex',
        backgroundColor: "#eeeeee",
    },
}));

const TrainerDashboard = (props) => {
    const [trainerName, setTrainerName] = useState("")
    const [upcomingCourses, setUpcomingCourses] = useState({});
    const [liveCourses, setLiveCourses] = useState({});
    const [languages, setLanguages] = useState({});
    const [open, setOpen] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();


    const classes = useStyles();

    useEffect(() => {
        showLoader();
        axios
            .get(`${basename}/api/course/?trainer=${props.userId}`)
            .then((res) => {
                hideLoader();
                //console.log(res.data.objects);
                const tmp = res.data.objects;
                tmp.map(k => {
                    const startdate = Date.parse(k.startdate);
                    const enddate = Date.parse(k.enddate);
                    const curdate = Date.now();
                    setTrainerName(k.trainer.user.fullname);
                    setLanguages(prev => {
                        return { ...prev, [k.language.name]: k.language.id };
                    })
                    if (curdate >= startdate && curdate <= enddate) {
                        setLiveCourses(prev => {
                            return {...prev, [k.id]:k};
                        })
                    }
                    else if (curdate < startdate) {
                        setUpcomingCourses(prev => {
                            return {...prev, [k.id]:k};
                        })
                    }
                });
                
            });
    }, [props]);
    console.log(liveCourses);
    return (
        <div className="main-wrapper">
            <div className={classes.root}>
                <CssBaseline />
                <Drawer />

                {/* Grid */}
                <Container className={classes.cardGrid}>
                    <Grid container spacing={2}>
                        <LanguagesYouTeach languages={languages}/>
                        <Notifications {...props} liveCourses={liveCourses}/>

                        {/* Live Courses*/}
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h3" component="h2">
                                Live Courses
                                </Typography>
                        </Grid>
                        <Grid xs={12}>
                            <LiveCourses liveCourses={liveCourses} />
                        </Grid>
                        
                        {/* Upcoming Courses*/}
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h3" component="h2">
                                Upcoming Courses
                                </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <UpcomingCourses upcomingCourses={upcomingCourses} />
                        </Grid>
                    </Grid>
                </Container>
            </div>
            {loader}
        </div>
    );
};

TrainerDashboard.propTypes = {};

export default TrainerDashboard;

