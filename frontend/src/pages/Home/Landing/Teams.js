import React,{ useState, useEffect } from 'react'
import basename from "../Home/basename.js";
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';

const items =[
  {
    src:"",
    title:"",
    text:"",
  },
  {
    src:"",
    title:"",
    text:"",
  },
  {
    src:"",
    title:"",
    text:"",
  },
]

const Teams = (props) =>{
    return (
        <div id="team" className="text-center">
          <Container>
            <Grid container spacing={4} xs={12}>
              <h2>Meet the Team</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit duis sed
                dapibus leonec.
              </p>
            </Grid>
            <div id="row">
              {this.props.data
                ? this.props.data.map((d, i) => (
                    <div  key={`${d.name}-${i}`} className="col-md-3 col-sm-6 team">
                      <div className="thumbnail">
                        {" "}
                        <img src={d.img} alt="..." className="team-img" />
                        <div className="caption">
                          <h4>{d.name}</h4>
                          <p>{d.job}</p>
                        </div>
                      </div>
                    </div>
                  ))
                : "loading"}
            </div>
          </Container>
        </div>
      );
}

export default Teams