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
                    {/* <ButtonGroup className={classes.btnGroup}>
                        <Button variant="contained" color="primary" onClick={() => {this.props.deleteItem(this.props.id)}}>
                            Delete
                        </Button>
                        <Button variant="contained" color="secondary">
                            Check
                     </Button>
                    </ButtonGroup> */}
                    <IconButton onClick={() => this.props.deleteItem(this.props.id)} style={{color: "#f44336"}} className={classes.btnGroup}>
                        <Delete />
                    </IconButton>
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
    item: state.item
})

export default connect(mapStateToProps, { deleteItem })(withStyles(styles)(Item));

