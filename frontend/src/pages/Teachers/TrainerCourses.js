import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import PropTypes from "prop-types";
import basename from "../Home/basename.js";
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
import useFullPageLoader from '../../Components/FullPageLoader/useFullPageLoader.js';

let language  = "";

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
}));

const CourseCard = (props) => {
    const classes = useStyles();
    const courses = props.courses;
    return (
        <div>
            <Container className={classes.cardGrid} maxWidth="md">
                {/* End hero unit */}
                <Grid container spacing={4}>
                    {courses.map((e) => (
                        <Grid item key={e} xs={12} sm={6} md={4}>
                            <Card className={classes.card}>
                                <CardMedia
                                    className={classes.cardMedia}
                                    image= { '/' + language + '.svg'}
                                    title="Image title"
                                />
                                <CardContent className={classes.cardContent}>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {e['name']}
                                    </Typography>
                                    <Typography>
                                        {e['description']}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={`/dashboard/courses/details/${e.id}`}>
                                        <Button color="primary" size="lg">View</Button>
                                    </Link>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
};

const TrainerCourses = (props) => {
    const classes = useStyles();
    const [courses, setCourses] = useState([]);   //contains all the courses related to chosen language
    const [loader,showLoader,hideLoader] = useFullPageLoader();

    useEffect(() => {
      showLoader();
        axios.get(`${basename}/api/language/`)
            .then(res => {
              hideLoader();
                const tmp = res.data.objects;
                tmp.map(k => {
                    if (k.name == props.match.params['language']) {
                        language = k.name;
                        const url = k.resource_uri;
                        axios.get(`${basename}${url}`)     //use this to fetch courses for a language(contains language name)
                            .then(res => {
                                axios.get(`${basename}/api/course/?language=${res.data.id}&&trainer=${props.userId}`)
                                    .then(res2 => {
                                        const tmp2 = res2.data.objects;
                                        tmp2.map(k => {
                                            let obj = {};
                                            obj['id'] = k.id;
                                            obj['name'] = k.name;
                                            obj['description'] = k.description;
                                            obj['startdate'] = k.startdate;
                                            obj['enddate'] = k.enddate;
                                            setCourses(prev => {
                                                return [...prev, obj];
                                            });
                                        });
                                    });
                            });
                    }
                });
            });
    }, [props.match.params['language']]);
    return (
        <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              {language}
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              Something short and leading about the collection below—its contents, the creator, etc.
              Make it short and sweet, but not too short so folks don&apos;t simply skip over it
              entirely.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Show Completed
                  </Button>
                </Grid>
                <Grid item>
                  <Button variant="outlined" color="primary">
                    Search
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
            <CourseCard courses={courses} />
            {loader}
        </main>
    )
}
export default TrainerCourses;