
import React,{ useState, useEffect } from 'react'
import basename from "../Home/basename.js";
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
import useFullPageLoader from '../../Components/FullPageLoader/useFullPageLoader.js';
import { CardActionArea } from '@material-ui/core';


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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const Assignment = (props) =>{
  const classes = useStyles();
  const [assignments,setAssignments] = useState([]);
  const [loader,showLoader,hideLoader] = useFullPageLoader();

  let course_id;
  const student_course_id = props.match.params['id'];
  useEffect(()=>{
    showLoader();
    axios.get(`${basename}/api/student_course/${student_course_id}`)
          .then((res)=>{
            hideLoader();
            console.log(res.data);
            course_id = res.data.course['id'];
            
          }).then(()=>{
            console.log("sadsadasd",course_id);
            axios.get(`${basename}/api/assignments/?course=${course_id}`)
            .then(res=>{
               const tmp = res.data.objects;
               
               tmp.map(k=>{
                   const tmpassignment = {};
                   tmpassignment['topic'] = k.topic;
                   tmpassignment['description'] = k.description;
                   tmpassignment['created_at'] = k.created_at;
                   tmpassignment['pdf'] = k.pdf;
                   console.log(k.pdf);
                   tmpassignment['deadline'] = k.deadline;
                   setAssignments(prev=>{
                       return [...prev,tmpassignment];
                   }) 
               });
            });
          })
    //hideLoader();      
  },[props.match.params['id']]);


  return (
    <React.Fragment>
      <CssBaseline />
    
      <main>
        {/* Hero unit */}
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Assignments
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
            The Assignments related to the course have been posted here. Please go throught them before the next class.
            </Typography>
          </Container>
        </div>
        <Container className={classes.cardGrid} >
          {/* End hero unit */}
          <Grid container spacing={4} maxWidth="lg">
            {assignments.map((e) => (
              <Grid item key={e} xs={12} sm={6} md={4}>
                <Card className={classes.card}>
                <CardActionArea> 
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random?book"
                    title="Image title"
                  />
                  <CardContent className={classes.cardContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {e['topic']}
                    </Typography>
                    <Typography>
                      {e['description']}
                    </Typography>
                    <Typography>
                      Dealine : {e['deadline']}
                    </Typography>
                  </CardContent>
                  <Button size="small" color="primary">
                    <a href={`${basename}${e['pdf']}`} target='blank'>
                    Download
                    </a>
                    </Button>
                    <Button size="small" color="primary">
                      {e['created_at']}
                    </Button>
                    </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      {loader}
    </React.Fragment>
  );
}

export default Assignment