import React from 'react';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import { ButtonGroup, Toolbar, IconButton, makeStyles, Typography,  Menu, MenuItem } from '@material-ui/core';
import { useState } from 'react';
import AccountCircle from '@material-ui/icons/AccountCircle';



const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1)
  },
  title: {
    flexGrow: 1,
  },
  desktop: {
    display: "none",
    [theme.breakpoints.up('sm')]: {
      display: "flex"
    }
  },
  mobile: {
    display: "flex",
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  }
}))



function Navbar() {

  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);


  const handleClick = (event) => {
    setAnchorEl(event.target);
  }

  const close = () => {
    setAnchorEl(null);
  }

  return (
    
     <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            hentai4u
          </Typography>
          <div className={classes.desktop}>
            <ButtonGroup>
              <Button color="secondary" variant="contained">Login</Button>
              <Button color="secondary" variant="contained">Register</Button>
            </ButtonGroup>
          </div>
          <div className={classes.mobile}>
            <IconButton aria-controls="acc-menu" aria-haspopup="true" edge="end" onClick={handleClick}>
              <AccountCircle />
            </IconButton>
            <Menu open={Boolean(anchorEl)} id="acc-menu" keepMounted onClose={close}>
              <MenuItem onClick={() => alert('Gijdillaxsan??')}>Профиль</MenuItem>
              <MenuItem onClick={() => alert('Gijdillaxsan??')}>Логин</MenuItem>
              <MenuItem onClick={() => alert('Gijdillaxsan??')}>Регистрация</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
   
  );  
}

export default Navbar;
