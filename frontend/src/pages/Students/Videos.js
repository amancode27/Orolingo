import React,{ useState, useEffect } from 'react';
import basename from "../Home/basename.js";
import axios from "axios";
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import useFullPageLoader from '../../Components/FullPageLoader/useFullPageLoader.js';
import ReactPlayer from 'react-player';


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
      minWidth : '350px',
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
      padding: theme.spacing(5),
    },
  }));
  const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

const VideosCard = (props) => {
  const classes = useStyles();

  const Videos = props.Videos;
  return (
    <div style={{marginLeft:"30px",flex: "0 0 15%"}}>
      <Card className={classes.card}>
          <div style={{minHeight : "200px"}}>
        <ReactPlayer
            className='react-player'
            url= {`${basename}${Videos['pdf']}`}
            width='100%'
            height='100%'
            controls
        />
        </div>
        <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h4" component="h2">
            {Videos['topic']}
            </Typography>
            <Typography>
            {Videos['description']}
            </Typography>
          </CardContent>
          <CardActions>
            <a href={`${basename}${Videos['pdf']}`} target='blank'>
            <Button size="large" color="primary">
              Download
            </Button>
            </a>
            <Button size="large" color="primary">
            Date added-{Videos['created_at']}
            </Button>
          </CardActions>
      </Card>
    </div>
  );
};
const Videos = (props) =>{
      const classes = useStyles();
      const [Videos,setVideos] = useState([]);
      let course_id;
      const student_course_id = props.match.params['id'];
      const [loader,showLoader,hideLoader] = useFullPageLoader();

      useEffect(()=>{
        showLoader();
        axios.get(`${basename}/api/student_course/${student_course_id}`)
             .then(res=>{
               hideLoader();
                course_id=res.data.course['id'];
             }).then(()=>{
              axios.get(`${basename}/api/videos/?course=${course_id}`)
              .then(res=>{
                 const tmp = res.data.objects;
                 tmp.map(k=>{
                     const tmpVideos = {};
                     tmpVideos['topic'] = k.topic;
                     tmpVideos['description'] = k.description;
                     tmpVideos['created_at'] = k.created_at;
                     tmpVideos['pdf'] = k.pdf;
                     setVideos(prev=>{
                         return [...prev,tmpVideos];
                     }) 
                 });
              });
             })
      },[props.match.params['id']]);
      console.log(Videos);
    return(
      <React.Fragment>
        <CssBaseline />
        <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Videos
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              The Videos related to the course have been posted here. Please go throught them before the next class.
            </Typography>
            </Container>
          </div>
            <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
                {Videos.map((k,index)=>(
                <VideosCard Videos={k} index={index}/>
                  ))};
              </Grid>
            </Container>
        </main>  
        {loader}
        </React.Fragment>  
    );
};
export default Videos;
