import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import basename from "../../Home/basename.js";
import axios from "axios";

import Sidebar from "../sidebar"
import ThemeRoutes from '../routing';

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useFullPageLoader from '../../../Components/FullPageLoader/useFullPageLoader.js';

import { mainListItems, secondaryListItems } from '../listItems';
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

// PAGES Import //
import LiveCourses from "./LiveCourses.js";
import UpcomingCourses from "./UpcomingCourses.js";
import LanguagesYouTeach from "./LanguagesYouTeach";
import Notifications from "./Notifications"

const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    root: {
        display: 'flex',
        backgroundColor: "#eeeeee",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    openIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 10,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 200,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const TrainerDashboard = (props) => {
    const [trainerName, setTrainerName] = useState("")
    const [upcomingCourses, setUpcomingCourses] = useState([]);
    const [liveCourses, setLiveCourses] = useState([]);
    const [languages, setLanguages] = useState({});
    const [open, setOpen] = useState(false);
    const [loader, showLoader, hideLoader] = useFullPageLoader();

    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };

    const classes = useStyles();

    useEffect(() => {
        showLoader();
        axios
            .get(`${basename}/api/course/?trainer=${props.userId}`)
            .then((res) => {
                hideLoader();
                //console.log(res.data.objects);
                const tmp = res.data.objects;
                setLiveCourses([]); setUpcomingCourses([]);
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
                            return [...prev, k];
                        })
                        // if(startdate==curdate){
                        //     setStartCourse(prev=>{
                        //         return{...prev, k}
                        //     })
                        // }
                        // if(enddate==curdate){
                        //     setEndCourse(prev=>{
                        //         return{...prev, k}
                        //     })
                        // }
                    }
                    else if (curdate < startdate) {
                        setUpcomingCourses(prev => {
                            return [...prev, k];
                        })
                    }
                });
                
            });
    }, [props]);
    // liveCourses.map(e=>{
    //     axios.get(`${basename}/api/assignments/?course=${e.id}`)
    //     .then(res1=>{
    //         // setAssignments(prev=>{
    //         //     return{...prev,res}
    //         // })
    //         console.log(res1.data)
    //         // const curdate = Date.now();
    //         // const tmp =res;
    //         // tmp.map(k=>{
    //         //     if(Date.parse(k.deadline)===curdate){
    //         //         
    //         //     }
    //         // })
    //     })
    // })
    // console.log(assignments)

    return (
        <div className="main-wrapper">
            <div className={classes.root}>
                <CssBaseline />
                <Drawer
                    variant="permanent"
                    classes={{
                        paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                    }}
                    open={open}
                >
                    <div className={classes.toolbarIcon}>
                        <IconButton onClick={handleDrawerClose}
                            className={clsx(classes.menuButton, (!open) && classes.menuButtonHidden)}>
                            <ChevronLeftIcon />
                        </IconButton>
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
                        >
                            <ChevronRightIcon />
                        </IconButton>
                    </div>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                    /* <List>{secondaryListItems}</List>
                </Drawer>

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

