import React from "react";
import PropTypes from "prop-types";
import Navlink from "./Navlink";
import "../style/Navbar.scss";
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import { deepOrange, deepPurple } from '@material-ui/core/colors';
import { Link } from 'react-router-dom';

import {
  Navbar,
  Collapse,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  
} from 'reactstrap';



const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(0),
    },
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  navParent: {
    
  },
  navbar: {
    display: "flex",
    flexDirection: "column",
    justifyContent:"center",
    alignItems:"center",
  
  },
  simpleMenu: {
    outline: "none",
  },
}));

function LetterAvatars() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Avatar style={{"margin":"0px !important"}}></Avatar>
    </div>
  );
}



function SimpleMenu(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () =>{
    props.handleLogout();
    
    setAnchorEl(null);
  }

  return (
    <div style={{margin:"0px !important",zIndex:"1000000000000000"}}>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} style={{"margin":"0px"}}>
        <LetterAvatars/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        style={{"marginTop":"30px" , "marginLeft":"5px" , "width":"300px" ,"z-index":"10000000"}}
      >
        <Link to='/' style={{"textDecoration":"None", "color":"black"}}>
          <MenuItem >Home </MenuItem>
      </Link>
        <Link to='/dashboard' style={{"textDecoration":"None", "color":"black"}}>
          <MenuItem >Dashboard </MenuItem>
      </Link>
      <Link to='/login' style={{"textDecoration":"None"}}>
        <MenuItem onClick={handleLogout} >Logout</MenuItem>
      </Link>
      
      </Menu>
    </div>
  );
}


const NavBar = (props) => {
  const classes = useStyles();
  const [isOpen, setIsOpen] = React.useState(false);
  console.log("This is props");
  console.log(props);
  const toggle = () => setIsOpen(!isOpen);
  let e;
  if(props.loggedIn){
    e=(<SimpleMenu {...props} className={classes.simpleMenu}/>)
  }
  else{
    e=(<NavItem>
      <Navlink link="/login" linktext="Log In" />
    </NavItem>)
  }
  return (
    <nav className="navbar" style={{"position":"sticky","top":"0px" , "z-index":"100000",backgroundColor:"rgba(0,0,50,.3)"}}>
      <Navbar dark expand="md" style={{padding: "0"}} className={classes.navParent}>
      <NavbarBrand className="mr-auto">{''}</NavbarBrand>
      <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav navbar className={classes.navbar} style={{backgroundColor: "lightsteelblue",}}>
            <NavItem>
              <Navlink link="/" linktext="Home"/> 
            </NavItem>
            <NavItem>
              <Navlink link="/services" linktext="Services"/>
            </NavItem>
            <NavItem>
              <Navlink link="/languages" linktext="Languages"/>
            </NavItem>
            <NavItem>
              <Navlink link="/tellus" linktext="Tell us" />
            </NavItem>
            <NavItem>
              {e}
            </NavItem>
          </Nav>
        </Collapse>
        </Navbar>
      {/* <Navlink link="/profile" linktext="Profile" /> */}
    </nav>
  );
};

export default NavBar;
