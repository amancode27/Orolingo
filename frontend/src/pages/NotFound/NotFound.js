import React from 'react';
import "../NotFound/style.css"
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

const sub__text = "The site cannot load your request. One of the following reasons may be the cause:"
const items = [
  {
    text: "Check Your network connection.",
  },
  {
    text: "Ensure that the link you entered is correct.",
  },
  {
    text: "Ensure that you are logged in for accessing certian sections of the website .",
  },
]

const NotFound = (props) => {
  return (
    <div class="root">
      <Container maxWidth="md">
        <Grid container align="center">
          <Grid item xs={12}>
            <Typography class=" header__text">404 not found</Typography>
          </Grid>
          <Grid item xs={12} align="left">
            <Typography class=" sub__text">{sub__text}</Typography>
            <ul>
              {items.map(e => (
                <li class="list__item"><FiberManualRecordIcon/> {e.text}</li>
              ))}
            </ul>
          </Grid>
        </Grid>
      </Container>
    </div>
  )
}

export default NotFound
