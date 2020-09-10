import React, { Component } from 'react';
import { connect } from 'react-redux';
import { addItem } from '../actions/itemActions';
import { TextField, Container, withStyles, Fab, Dialog, Button, DialogActions, DialogTitle, DialogContent, DialogContentText } from '@material-ui/core';
import PropTypes from 'prop-types';
import Add from '@material-ui/icons/Add';

const styles = theme => ({
    nameForm: {
        [theme.breakpoints.down('xs')]: {
            display: "none"
        }
    },
    modalFab: {
        position: "absolute",
        top: "90%",
        left: "85%",
        [theme.breakpoints.up('sm')]: {
            display: "none",   
        }    
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

        return (
            <div>
                <form  style={{marginTop: "2rem", marginBottom: "2rem"}} onSubmit={this.onSubmit}>
                    <Container>
                        <TextField className={classes.nameForm} value={this.state.name} required name="name" variant="outlined" color="primary" label="Name" onChange={this.onChange} autoComplete="off"/>
                    </Container>
                </form>
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
                        <TextField onChange={this.onChange} autoFocus margin="dense" value={this.state.name} name="name" id="name" type="text" fullWidth label="Название" />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleToggle} color="primary">Отмена</Button>
                        <Button onClick={this.onSubmit} color="secondary">Добавить</Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
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
    item: state.item
})

export default connect(mapStateToProps, { addItem })(withStyles(styles)(ItemForm));