import React,{ useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
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

const NotesCard = (props) => {
  const classes = useStyles();

  const notes = props.notes;
  return (
    <div style={{marginLeft:"30px",flex: "0 0 25%"}}>
      <Card className={classes.card}>
        <CardMedia
          className={classes.cardMedia}
          image="https://source.unsplash.com/random"
          title="Image title"
        />
        <CardContent className={classes.cardContent}>
            <Typography gutterBottom variant="h5" component="h2">
            {notes['topic']}
            </Typography>
            <Typography>
            {notes['description']}
            </Typography>
          </CardContent>
          <CardActions>
            <a href={`http://localhost:8000${notes['pdf']}`} target='blank'>
            <Button size="small" color="primary">
              Download
            </Button>
            </a>
            <Button size="small" color="primary">
            Date added-{notes['created_at']}
            </Button>
          </CardActions>
      </Card>
    </div>
  );
};
const Notes = (props) =>{
      const classes = useStyles();
      const [notes,setNotes] = useState([]);
      let course_id;
      const student_course_id = props.match.params['id'];

      useEffect(()=>{
        axios.get(`${basename}/api/student_course/${student_course_id}`)
             .then(res=>{
                course_id=res.data.course['id'];
             }).then(()=>{
              axios.get(`${basename}/api/note/?course=${course_id}`)
              .then(res=>{
                 const tmp = res.data.objects;
                 tmp.map(k=>{
                     const tmpnotes = {};
                     tmpnotes['topic'] = k.topic;
                     tmpnotes['description'] = k.description;
                     tmpnotes['created_at'] = k.created_at;
                     tmpnotes['pdf'] = k.pdf;
                     setNotes(prev=>{
                         return [...prev,tmpnotes];
                     }) 
                 });
              });
             })
      },[props.match.params['id']]);

    return(
      <React.Fragment>
        <CssBaseline />
        <main>
        <div className={classes.heroContent}>
          <Container maxWidth="sm">
            <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
              Notes
            </Typography>
            <Typography variant="h5" align="center" color="textSecondary" paragraph>
              The Notes related to the course have been posted here. Please go throught them before the next class.
            </Typography>
            <div className={classes.heroButtons}>
              <Grid container spacing={2} justify="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Latest
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
            <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={4}>
                {notes.map((k,index)=>(
                <NotesCard notes={k} index={index}/>
                  ))};
              </Grid>
            </Container>
        </main>  
        
        </React.Fragment>  
    );
};
export default Notes;
