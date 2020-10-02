import { Container } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import basename from "../Home/basename.js";
import ReactStars from "react-rating-stars-component";
import 'react-vertical-timeline-component/style.min.css';
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import WorkIcon from '@material-ui/icons/Work';
import StarIcon from '@material-ui/icons/Star';
import 'purecss/build/pure.css';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    heroContent: {
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(8, 0, 6),
      },
}))

const Feedback = (props) => {

    const classes = useStyles();

    const [feedData, setFeedData] = useState([]);

    useEffect( () => {
        const course_id = props.match.params['id'];
        //console.log(course_id);
        Axios.get(`${basename}/api/feedback/?course=${course_id}`)
        .then((res) => {
            setFeedData(res.data.objects);
            
        })

    },[props.match.params['id']])

    console.log(feedData);

    return (
        <div>
            <Container maxWidth="lg">
            <div className={classes.heroContent}>
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Feedback
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              You can view the feed backs from your students here 
            </Typography>
            </div>

            <VerticalTimeline className="vertical-timeline-custom-line">
            { feedData.map((e) => (
                    <VerticalTimelineElement
                        className="vertical-timeline-element--work"
                        contentStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        contentArrowStyle={{ borderRight: '7px solid  rgb(33, 150, 243)' }}
                        iconStyle={{ background: 'rgb(33, 150, 243)', color: '#fff' }}
                        icon={<WorkIcon />}
                    >
                        <h3 className="vertical-timeline-element-title"> <ReactStars  count={5} value={e.rating} size={24} activeColor="#ffd700" onChange={(newRating) => { newRating = e.rating }} /></h3>
                        <br/>
                        <h5>
                        {e.body}
                        </h5>
                    </VerticalTimelineElement>
                    
                    
                    )) }

                        <VerticalTimelineElement
                        iconStyle={{ background: 'rgb(16, 204, 82)', color: '#fff' }}
                        icon={<StarIcon />}
                        />
                </VerticalTimeline>
            </Container>
        </div>
    )
}

export default Feedback;
