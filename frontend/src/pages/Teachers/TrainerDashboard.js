import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import basename from "./../Home/basename.js";
import axios from "axios";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { ListGroup, ListGroupItem } from 'reactstrap';


import { mainListItems, secondaryListItems } from './listItems';
import { Link } from "react-router-dom";
import clsx from 'clsx';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
//import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


const drawerWidth = 240
const useStyles = makeStyles((theme) => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(8),
    },
    card: {
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
    },
    cardMedia: {
        paddingTop: '56.25%', // 16:9
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(6),
    },
    root: {
        display: 'flex',
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
    const buttonStyle = {
        width: "100px",
        fontSize: "10px",
        fontFamily: "sans-serif",
        height: "35px",
        marginLeft: "auto",
        marginRight: "auto",
        borderRadius: "10px",
        marginTop: "10px"
    };
    const [trainerName, setTrainerName] = useState("")
    const [upcomingCourses, setUpcomingCourses] = useState([]);
    const [liveCourses, setLiveCourses] = useState([]);
    const [languages, setLanguages] = useState({});
    const [open, setOpen] = useState(false);
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    const classes = useStyles();

    const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);


    useEffect(() => {
        axios
            .get(`${basename}/api/course/?trainer=${props.userId}`)
            .then((res) => {
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
                    }
                    else if (curdate < startdate) {
                        setUpcomingCourses(prev => {
                            return [...prev, k];
                        })
                    }
                });
            });
    }, [props]);


    return (
        <div>
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
                         className={clsx(classes.menuButton, (!open) &&classes.menuButtonHidden)}>
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
                    {/* <List>{secondaryListItems}</List> */}
                </Drawer>
                <Container className={classes.cardGrid} maxWidth="md">
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Languages You Teach
                            </Typography>
                        </Grid>
                        {Object.keys(languages).map(e => (
                            <Grid item key={e} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                                    <CardContent className={classes.cardContent} >
                                        <Typography gutterBottom variant="h5" component="h2">
                                            <Link style={{ textDecoration: "none", }} to={`dashboard/trainercourses/${e}`}>
                                                {e}
                                            </Link>
                                        </Typography>
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Live Courses
                        </Typography>
                        </Grid>
                        {liveCourses.map(e => (
                            <Grid item key={e} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">{e.name}</Typography>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            Start-Date :{e.startdate}<br/>End Date: {e.enddate} 
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container spacing={1}>
                                        <Grid item xs={6} >
                                        <Button variant="contained" color="primary" className="dor">
                                            <Link to={`/dashboard/trainercourses/uploads/${e.id}`} color="inherit">
                                                Upload Content
                                            </Link> 
                                        </Button>
                                        </Grid>
                                        <Grid item xs={6} >
                                        <Button variant="contained" color="primary" className="dor">>
                                            <Link to={`/dashboard/chatapp/${e.id}`}>
                                                Chat App
                                            </Link> 
                                        </Button>
                                        <Grid item xs={6} >
                                        <Button variant="contained" color="primary" className="dor">>
                                            <Link to={`dashboard/editcourse/${e.id}`}>
                                                Edit
                                            </Link> 
                                        </Button>
                                        </Grid>
                                        </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        <Grid item xs={12}>
                            <Typography gutterBottom variant="h5" component="h2">
                                Upcoming Courses
                        </Typography>
                        </Grid>
                        {upcomingCourses.map(e => (
                            <Grid item key={e} xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent}>
                                        <Typography gutterBottom variant="h5" component="h2">{e.name}</Typography>
                                        <Typography gutterBottom variant="h6" component="h2">
                                            Start-Date :{e.startdate}<br/>End Date: {e.enddate} 
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Grid container spacing={1}>
                                        <Grid item xs={6} >
                                        <Button variant="contained" color="primary" className="dor">
                                            <Link to={`/dashboard/trainercourses/uploads/${e.id}`}>
                                                Upload Content
                                            </Link> 
                                        </Button>
                                        </Grid>
                                        <Grid item xs={6} >
                                        <Button variant="contained" color="primary" className="dor">>
                                            <Link to={`dashboard/editcourse/${e.id}`}>
                                                Chat App
                                            </Link> 
                                        </Button>
                                        </Grid>
                                        <Grid item xs={6} >
                                        <Button variant="contained" color="primary" className="dor">>
                                            <Link to={`/dashboard/chatapp/${e.id}`}>
                                                Edit
                                            </Link> 
                                        </Button>
                                        </Grid>
                                        </Grid>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                        <Grid xs={12} sm={6} md={4}>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia}
                                        image="https://source.unsplash.com/random"
                                        title="Image title"
                                    />
                                    <CardContent className={classes.cardContent} >
                                        <Typography gutterBottom variant="h5" component="h2">
                                        <Link to="dashboard/createcourse" style={{marginLeft:"auto",marginRight:"auto"}}>
                                            <Button variant="outlined" color="primary">Upload Course</Button>
                                         </Link>
                                        </Typography>
                                    </CardContent>
                                </Card>
                        </Grid>
                    </Grid>
                </Container>
            </div>
        </div>
    );
};

TrainerDashboard.propTypes = {};

export default TrainerDashboard;

