import React, { Component } from "react";
import {
  Grid,
  Typography,
  Container,
  withStyles,
  Box,
} from "@material-ui/core";
import Item from "./Item";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getItems, setLoading } from "../actions/itemActions";
import { CircleLoader } from "react-spinners";

const classes = {
  brand: {
    color: "#673AB7",
  },
  loadingCont: {
    position: "absolute",
    top: "40vh",
    left: "50%",
    display: "flex",
    transform: "translate(-50%, 0)",
    flexDirection: "column",
  },
  loading: {
    alignSelf: "center",
    marginLeft: "auto",
    marginRight: "auto",
  },
  cont: {
    marginTop: "1rem",
    paddingBottom: "3rem",
  },
};

class ItemList extends Component {
  componentDidMount() {
    this.props.setLoading();
    this.props.getItems();
  }

  render() {
    const { classes } = this.props;

    if (this.props.item.loading) {
      return (
        <Box className={classes.loadingCont}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <CircleLoader
              loading={this.props.item.loading}
              className={classes.loading}
              color="#673AB7"
            />
          </div>
          <Typography style={{ paddingTop: "5px" }}>Загрузка</Typography>
        </Box>
      );
    }

    if (this.props.item.items.length === 0) {
      return (
        <Container style={{ marginTop: "3rem" }}>
          <Typography gutterBottom variant="h4">
            <span className={classes.brand}>ez5</span> - тестовая сборка и база
            данных
          </Typography>
          {!this.props.isAuthenticated && (
            <Typography gutterBottom variant="h5">
              Войдите или зарегистрируйтесь чтобы добавлять и удалять заметки.
            </Typography>
          )}
        </Container>
      );
    }
    return (
      <div className={classes.cont}>
        {!this.props.isAuthenticated && (
          <Typography gutterBottom variant="h5">
            Войдите или зарегистрируйтесь чтобы добавлять и удалять заметки.
          </Typography>
        )}
        <Typography style={{ paddingLeft: "1rem" }} variant="h4" gutterBottom>
          Заметки:
        </Typography>
        <Grid
          item
          container
          spacing={4}
          direction="row"
          alignItems="center"
          style={{ marginBottom: "2rem" }}
        >
          {this.props.item.items.map((item) => (
            <Item name={item.name} id={item._id} key={item._id} />
          ))}
        </Grid>
      </div>
    );
  }
}

ItemList.propTypes = {
  items: PropTypes.object,
  getItems: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  item: state.item,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { getItems, setLoading })(
  withStyles(classes)(ItemList)
);
