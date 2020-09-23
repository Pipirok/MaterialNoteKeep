import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import Fab from '@material-ui/core/Fab';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Button from '@material-ui/core/Button'
import PropTypes from 'prop-types';
import Add from '@material-ui/icons/Add';
import red from "@material-ui/core/colors/red";
import purple from "@material-ui/core/colors/purple";

const styles = theme => ({
    modalFab: {
        position: "relative",
    },
    fabContainer: {
        position: "fixed",
        [theme.breakpoints.down("xs")]: {
            top: "85%",
            left: "76%",
        },
        [theme.breakpoints.up("sm")]: {
            top: "90%",
            left: "85%"
        },
        [theme.breakpoints.up("md")]: {
            top: "90%",
            left: "92%"
        },
        
    }
});


class ItemForm extends Component {

    state = {
        name: "",
        modal: false
    }

    handleToggle = () => {
        this.setState({
            modal: !this.state.modal
        })
    }

    render() {

        const { classes } = this.props

        if (!this.props.isAuthenticated) {
            return null;
        } else {
            return (
                <div className={classes.fabContainer}>
                    <Fab color="primary" className={classes.modalFab} size="large" onClick={this.handleToggle}>
                        <Add />
                    </Fab>
                    <Dialog open={this.state.modal} onClose={this.handleToggle}>
                        <DialogTitle>
                            Добавить предмет
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Введите название предмета
                            </DialogContentText>
                            <TextField onChange={this.onChange} autoComplete="off" autoFocus variant="outlined" style={{color: purple[300]}} margin="dense" value={this.state.name} name="name" id="name" type="text" fullWidth label="Название" />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleToggle} variant="text" style={{color: red[500]}} color="primary">Отмена</Button>
                            <Button onClick={this.onSubmit} variant="contained" color="secondary">Добавить</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.addItem(this.state.name);
        this.setState({
            name: "",
            modal: false
        }) ;
    }
}

ItemForm.propTypes = {
    addItem: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { addItem })(withStyles(styles)(ItemForm));