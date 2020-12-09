import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Typography from "@material-ui/core/Typography";

import NavbarButtonGroup from "./NavbarButtonGroup";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  NavbarButtonGroupContainer: {
    marginLeft: "auto",
  },
}));

function Navbar() {
  const classes = useStyles();

  return (
    <AppBar position="sticky">
      <Toolbar className={classes.root}>
        <Typography variant="h4" className={classes.title}>
          ez5
        </Typography>
        <div className={classes.NavbarButtonGroupContainer}>
          <NavbarButtonGroup />
        </div>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;
