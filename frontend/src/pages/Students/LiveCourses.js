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

import {
    Progress,
  } from "reactstrap";

import Button from '@material-ui/core/Button';

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-around',
        // overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        //height :'400px',
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
}));



const LiveCourses = (props) => {
    const classes = useStyles();
    const liveCourses = props.liveCourses

    const [width, setWidth] = useState(1200);
    const [cols, setCols] = useState(3);

    let resizeWindow = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        resizeWindow();
        window.addEventListener("resize", resizeWindow);
        if (width <= 763) {
            setCols(1);
        }
        else if (width <= 1200) {
            setCols(2);
        }
        else {
            setCols(3);
        }
        return () => window.removeEventListener("resize", resizeWindow);
    }, [width])
    return (
        <div className={classes.root}>
            <GridList className={classes.gridList} cols={cols}>
                {liveCourses.map((e) => (
                    <GridListTile key={e} style={{ height: "450px", padding: "20px" }}>
                        <Card className={classes.card}>
                            <CardMedia
                                className={classes.cardMedia}
                                image="https://source.unsplash.com/random"
                                title="Image title"
                            />
                            <CardContent className={classes.cardContent}>
                                <Typography gutterBottom variant="h5" component="h2">{e.name}</Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    Start-Date : {e.course.startdate}
                                </Typography>
                                <Typography variant="subtitle1" color="textSecondary">
                                    End Date : {e.course.enddate}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Grid container spacing={1}>
                                    <Grid item xs={4} >
                                    <Typography component="h5" variant="h4">
                                      {e.completed_percent}%
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8}>
                                        <Progress className="ml-2 mr-2" value={e.completed_percent} /> 
                                    </Grid>
                                    <Grid item xs={6} >
                                        <Button variant="contained" color="primary">
                                            <Link to={`/dashboard/courses/coursecontent/${e.id}`} style={{ color: 'white' }}>
                                                <CloudUploadOutlinedIcon />Go
                                            </Link>
                                        </Button>
                                    </Grid>
                                </Grid>
                            </CardActions>
                        </Card>
                    </GridListTile>
                ))}
            </GridList>
        </div>
    );
}

export default LiveCourses
