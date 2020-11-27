import React,{ useState, useEffect } from 'react'
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

const items =[
  {
    src:"",
    title:"Aman Agarwal",
    text:"Team Lead",
  },
  {
    src:"",
    title:"Anindya Sikdar",
    text:"Team Lead Part 2",
  },
  {
    src:"",
    title:"Awais Akhtar",
    text:"Trash Designer 1",
  },
  {
    src:"",
    title:"Shivam Nayak",
    text:"Trash Designer 2",
  },
  {
    src:"",
    title:"Aryan Lohani",
    text:"Infinitely Trash Designer",
  },
]

const Teams = (props) =>{
    return (
      <div>
          <Typography align ="center" variant="h2">Meet the Team</Typography>
          <Typography align="center" variant="h3">Lorem ipsum</Typography>
          <Container maxWidth="xl">
            <Grid container spacing={4} justify="center" xs={12}>
              {items.map(e=>(
                <Grid item xs={4}>
                  <img src={e.src}></img>
                  <Typography align ="center" variant="h5">{e.title}</Typography>
                  <Typography align="center" variant="h6">{e.text}</Typography>
                </Grid>
              ))}
            </Grid>
          </Container>
        </div>
      );
}

export default Teams