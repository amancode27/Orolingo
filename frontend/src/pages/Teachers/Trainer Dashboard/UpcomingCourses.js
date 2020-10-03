import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import CloudUploadOutlinedIcon from '@material-ui/icons/CloudUploadOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";
import { CardActionArea } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        backgroundColor: "#eeeeee",
        // overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        //height :'400px',
        backgroundColor: "#eeeeee",
        flexWrap: 'nowrap',
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
        transform: 'translateZ(0)',
    },
    title: {
        color: theme.palette.primary.light,
    },
    titleBar: {
        background:
            'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
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
    link: {
        color: 'white',
    },
}));



const UpcomingCourses = (props) => {
    const classes = useStyles();
    const upcomingCourses = props.upcomingCourses;

    const [width, setWidth] = useState(1200);
    const [height, setHieght] = useState(450);
    const [cols, setCols] = useState(3);

    let resizeWindow = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        if (width <= 763) {
            setCols(1);
            setHieght(520);
        }
        else if (width <= 1200) {
            setCols(2);
            setHieght(490);
        }
        else {
            setCols(3);
        }
        return () => window.removeEventListener("resize", resizeWindow);
    }, [width]);

    if (upcomingCourses.length < 3) {
        return (
            <div>
                <Grid container spacing={4}>
                    {upcomingCourses.map(e => (
                        <Grid item key={e} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image= {'/' + e.language.name + '.svg' }
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">{e.name}</Typography>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        Start-Date :{e.startdate}<br />End Date: {e.enddate}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Grid container spacing={1}>
                                        <Grid item xs={6} >
                                            <Button variant="contained" color="primary" >
                                                <Link to={`/dashboard/trainercourses/uploads/${e.id}`} className={classes.link}>
                                                    <CloudUploadOutlinedIcon />Upload Content
                                </Link>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Button variant="contained" color="primary" >
                                                <Link to={`dashboard/editcourse/${e.id}`} className={classes.link}>
                                                    <EditOutlinedIcon />Edit
                                </Link>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6} >
                                            <Button variant="contained" color="primary" >
                                                <Link to={`/dashboard/chatapp/${e.id}`} className={classes.link}>
                                                    <ChatOutlinedIcon /> Chat App
                                </Link>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                        <Button variant="container" className={classes.link}>
                                            <Link to= {`dashboard/trainercourses/feedback/${e.id}`}>
                                                <EditOutlinedIcon /> Feedbacks
                                            </Link>
                                        </Button>
                                    </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                    <Grid item xs={12} sm={6} md={4} style={{marginTop : "80px"}}>
                    <CardActionArea>
                        <Link to="dashboard/createcourse" >
                            <CardMedia
                                className={classes.cardMedia}
                                image="add.webp"
                                title="Image title"
                            />
                        </Link>
                        </CardActionArea>
                    </Grid>
                </Grid>
            </div>
        )
    }
    else {
        return (
            <div className={classes.root}>
                <GridList className={classes.gridList} cols={cols}>
                    {upcomingCourses.map((e) => (
                        <GridListTile key={e} style={{ height: { height }, padding: "20px" }}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image= {'/' + e.language.name + '.svg' }
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">{e.name}</Typography>
                                    <Typography gutterBottom variant="h6" component="h2">
                                        Start-Date :{e.startdate}<br />End Date: {e.enddate}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Grid container spacing={1}>
                                        <Grid item xs={7} >
                                            <Button variant="contained" color="primary">
                                                <Link to={`/dashboard/trainercourses/uploads/${e.id}`} className={classes.link}>
                                                    <CloudUploadOutlinedIcon />Upload Content
                                            </Link>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={5} >
                                            <Button variant="contained" color="primary">
                                                <Link to={`dashboard/editcourse/${e.id}`} className={classes.link}>
                                                    <EditOutlinedIcon />Edit
                                            </Link>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={12} >
                                            <Button variant="contained" color="primary">
                                                <Link to={`/dashboard/chatapp/${e.id}`} className={classes.link}>
                                                    <ChatOutlinedIcon /> Chat App
                                            </Link>
                                            </Button>
                                        </Grid>
                                        <Grid item xs={6}>
                                        <Button variant="container" className={classes.link}>
                                            <Link to= {`dashboard/trainercourses/feedback/${e.id}`}>
                                                <EditOutlinedIcon /> Feedbacks
                                            </Link>
                                        </Button>
                                    </Grid>
                                    </Grid>
                                </CardActions>
                            </Card>
                        </GridListTile>
                    ))}
                    <GridListTile style={{ height: { height }, padding: "20px" ,marginTop : "80px"}}>
                    <CardActionArea>
                        <Link to="dashboard/createcourse" >
                            <CardMedia
                                className={classes.cardMedia}
                                image="add.webp"
                                title="Image title"
                            />
                        </Link>
                        </CardActionArea>
                    </GridListTile>
                </GridList>
            </div>
        );
    }
}
export default UpcomingCourses
