import React, { Component } from 'react';
import { Card, Typography, /* ButtonGroup, Button, makeStyles, */ Grid, CardContent, CardActions, withStyles, IconButton } from '@material-ui/core';
import { deleteItem } from '../actions/itemActions';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Delete } from '@material-ui/icons';

const styles = theme => ({
    root: {
        flexGrow: 1
    },
    title: {
        padding: "0.5rem 0",
        overflow: "hidden"
    },
    btnGroup: {
        marginLeft: "auto"
    }
})

class Item extends Component {

    
        render() {
            const { classes } = this.props;
        return (
        <Grid item xs={12} md={6} className={classes.root}>
            <Card>
                <CardContent>
                    <Typography className={classes.title} variant="h4" gutterBottom>
                        {this.props.name}
                    </Typography>
                </CardContent>
                <CardActions>
                    {this.props.isAuthenticated &&
                    <IconButton onClick={() => this.props.deleteItem(this.props.id)} style={{color: "#f44336"}} className={classes.btnGroup}>
                        <Delete />
                    </IconButton>}
                </CardActions>
            </Card>
        </Grid>
        )
    }
}

Item.propTypes = {
    deleteItem: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { deleteItem })(withStyles(styles)(Item));

