import React, { useState, useEffect, useLayoutEffect } from "react";
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import basename from "../../Home/basename.js";
import axios from "axios";
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
        maxHeight :'300px',
        width : '100%',
    },
    cardContent: {
        flexGrow: 1,
    },
    root: {
        display: 'flex',
        backgroundColor: "#eeeeee",
    },
}));

const Notifications = (props) => {
    const classes = useStyles();
    const liveCourses =props.liveCourses;
    const [assignmentsToday,setAssignments] = useState([]);
    const [endCourses,setEndCourses] = useState([]);
    const [startCourses,setStartCourses]=useState([]);

    // const curdate;
    
    // useEffect(()=>{
    //     liveCourses.map(e=>{
    //         axios.get(`${basename}/api/assignments/?course=${e.id}`)
    //         .then(res=>{
    //             const tmp = res.data.objects;
    //             const curdate = Date.now();
    //             tmp.map(k=>{
    //                 if(Math.abs(Date.parse(k.deadline)-curdate)){
    //                     setAssignments(prev=>{
    //                         return[...prev,e];
    //                     })
    //                 }
    //             })
    //         })
    //     })
    //     liveCourses.map(e=>{
    //         if(e.enddate===curdate){
    //             setEndCourses(prev=>{
    //                 return[...prev,k];
    //             })
    //         }
    //         if(e.startdate===curdate){
    //             setEndCourses(prev=>{
    //                 return[...prev,k];
    //             })
    //         }
    //     })
    // },[props])

    return (
        <Grid item xs={12} sm={6} md={4}>
            <Card style={{ backgroundColor: '#e65100' }}>
                <Typography gutterBottom variant="h4" component="h2"
                    style={{ textAlign: 'center',color:'white' }}>
                    Notifications <AccessTimeIcon /> 
                </Typography>
            </Card>
            <Grid item xs={12} >
                <Card className={classes.card}>
                    <CardContent className={classes.cardContent} >
                        {assignmentsToday.map(e=>(
                            <Typography gutterBottom variant="h5" component="h2">
                                Assignment deadline today of Course-{e.name} 
                                <Link to={`/dashboard/trainercourses/uploads/${e.id}`}>
                                    Go
                                </Link>
                            </Typography>
                        ))}
                        {startCourses.map(e=>(
                            <Typography gutterBottom variant="h5" component="h2">
                                Congratulations on starting your new course-{e.name} 
                            </Typography>
                        ))}
                        {endCourses.map(e=>(
                            <Typography gutterBottom variant="h5" component="h2">
                                Congratulations on Course Completion of {e.name} 
                            </Typography>
                        ))}
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    )
}
export default Notifications