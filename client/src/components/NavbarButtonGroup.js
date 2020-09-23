import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles';
import red from '@material-ui/core/colors/red';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from "@material-ui/core/Grid";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Grow from '@material-ui/core/Grow';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Close from '@material-ui/icons/Close';


import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import { register, login, logout } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

const styles = (theme) => ({
    root: {
        flexGrow: '1',
        display: 'flex',
    },
    desktop: {
        display: 'flex',
        [theme.breakpoints.down('xs')]: {
            display: 'none'
        }
    },
    mobile: {
        display: 'none',
        [theme.breakpoints.down('xs')]: {
            display: 'flex'
        }
    },
    menuButton: {
        marginRight: theme.spacing(1)
    },
    formInput: {
        marginTop: theme.spacing(2),
        marginRight: "auto",
    },
    passwordInput: {
        marginTop: theme.spacing(2),
        marginRight: "auto",
        width: "72%"
    },
    helperText: {
        color: red[500]
    },
    paper: {
        width: "400px",
        maxWidth: "95vw",
        maxHeight: "100%",
        padding: "1rem",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        border: "none"
    },
    inputCont: {
        width: "100%"
    },
    IconButton: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(3)
    },
    Alert: {
        width: "100%"
    },
});

 

class NavbarButtonGroup extends Component {

    validateEmail = (email) => {
        const re = /([a-z0-9!#$%&'*+/=?^_`{|}~-]{4,68})+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+(?:[a-z]{2}|com|org|net|gov|mil|biz|info|mobi|name|aero|jobs|museum)\b/
        return re.test(email);
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            if(error.id === 'REGISTER_FAIL' || error.id === 'LOGIN_FAIL') {
                this.setState({
                    alertTitle: "Ошибка",
                    alertContent: error.msg.msg,
                    alertSeverity: "error",
                    showAlert: true,
                });
            } 
        }
        if(this.state.registerModal) {
            if (isAuthenticated) {
                this.toggleRegisterModal();
            }
        } else if (this.state.loginModal) {
            if(isAuthenticated) {
                this.toggleLoginModal();
            }
        }
    }


    state = {
        anchorEl: null,
        registerModal: false,
        loginModal: false,
        login: "",
        email: "",
        password: "",
        helperText: "",
        validEmail: false,
        type: "password",
        alertTitle: "",
        alertContent: "",
        showAlert: false,
        alertSeverity: "",
        registerError: false,
        loginError: false
    }

    toggleVisibility = () => {
        this.setState({
            type: this.state.type === "password" ? "text" : "password",
        });
    }


    open = (e) => {
        this.setState({
            anchorEl: e.currentTarget
        })
    }

    close = () => {
        this.setState({
            anchorEl: null
        })
    }

   

    toggleRegisterModal = () => {
        this.setState({
            registerModal: !this.state.registerModal,
            email: "",
            login: "",
            password: "",
            alertTitle: "",
            alertContent: "",
            alertSeverity: "",
            showAlert: false
        })
    }

    toggleLoginModal = () => {
        this.setState({
            loginModal: !this.state.loginModal,
            login: "",
            password: "",
            alertTitle: "",
            alertContent: "",
            alertSeverity: "",
            showAlert: false
        })
    }

    onInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }


    openLoginFromRegister = () => {
        this.toggleRegisterModal();
        this.toggleLoginModal();
    }

    openRegisterFromLogin = () => {
        this.toggleLoginModal();
        this.toggleRegisterModal();
    }

    closeAlert = () => {
        this.setState({
            alertTitle: "",
            alertContent: "",
            showAlert: false
        });
        this.props.clearErrors();
    }

    onRegister = (e) => {
        e.preventDefault();

        const {
            email,
            password,
            login
        } = this.state;

        if(!login || !password || !email) {
            this.setState({
                showAlert: true,
                alertTitle: "Вы - дно",
                alertContent: "Заполни все поля, мразб",
                alertSeverity: "error"
            });
            return;
        } else if(login.length < 5 || login.length > 19) {
            this.setState({
                alertSeverity: "error",
                alertTitle: "Ошибка",
                alertContent: "Логин должен содержать больше 4 и меньше 20 символов!",
                showAlert: true
            });
        } else if(!this.validateEmail(email)) {
            this.setState({
                showAlert: true,
                alertTitle: "Вы ошиблись",
                alertContent: "Неправильный email!",
                alertSeverity: "error"
            }); 
            return;
        } else if(password.length < 5 || password.length > 19) {
            this.setState({
                alertSeverity: "error",
                alertTitle: "Ошибка",
                alertContent: "Пароль должен содержать больше 4 и меньше 20 символов!",
                showAlert: true
            });
            return;
        } else {
            const newUser = {
                login,
                email,
                password,
            }

            this.props.register(newUser);
        }

    }

    onLogin = (e) => {
        e.preventDefault();
        const { login, password } = this.state;

        if(!login || !password) {
            this.setState({
                showAlert: true,
                alertTitle: "Вы - дно",
                alertContent: "Заполни все поля, мразб",
                alertSeverity: "error"
            });
            return;
        } else if(login.length < 5 || login.length > 19) {
            this.setState({
                alertSeverity: "error",
                alertTitle: "Ошибка",
                alertContent: "Логин должен содержать больше 4 и меньше 20 символов!",
                showAlert: true
            });
        } else if(password.length < 5 || password.length > 19) {
            this.setState({
                alertSeverity: "error",
                alertTitle: "Ошибка",
                alertContent: "Пароль должен содержать больше 4 и меньше 20 символов!",
                showAlert: true
            });
            return;
        } else {
            this.props.login(login, password);
        }
    }


    render() {
        const {classes} = this.props;
    return (
        <div className={classes.root}>
            <div className={classes.desktop}>
                {!this.props.isAuthenticated ? <ButtonGroup>
                    <Button color="secondary" variant="contained" onClick={this.toggleLoginModal}>Login</Button>
                    <Button color="secondary" variant="contained" onClick={this.toggleRegisterModal}>Register</Button>
                </ButtonGroup> : <Grid container direction="row">
                    <Typography variant="h5" style={{marginRight: "0.5rem"}}>{this.props.user.login}</Typography>
                    <Button variant="contained" color="secondary" onClick={this.props.logout}>Выйти</Button>
                </Grid>}
            </div>
            <div className={classes.mobile}>
                <IconButton className={classes.menuButton} aria-controls="acc-menu" aria-haspopup="true" edge="end" onClick={this.open}>
                    <AccountCircle />
                </IconButton>
                {!this.props.isAuthenticated ? <Menu open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl} id="acc-menu" keepMounted onClose={this.close}>
                    <MenuItem onClick={this.toggleLoginModal}>Логин</MenuItem>
                    <MenuItem onClick={this.toggleRegisterModal}>Регистрация</MenuItem>
                </Menu> : <Menu open={Boolean(this.state.anchorEl)} anchorEl={this.state.anchorEl} id="acc-menu" keepMounted onClose={this.close}>
                    <MenuItem><Typography variant="h4">{this.props.user.login}</Typography></MenuItem>
                    <MenuItem onClick={this.props.logout}>Выйти</MenuItem>
                </Menu>}
            </div>

            <Modal open={this.state.registerModal} onClose={this.toggleRegisterModal}>
                <form id="register-form" onSubmit={this.onRegister}>
                <Paper square className={classes.paper}>
                    <Grid container direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant="h3">
                                Регистрация
                            </Typography>
                            <Typography variant="h4">
                                Уже есть аккаунт? <Button variant="text" color="secondary" size="large" onClick={this.openLoginFromRegister}>Войти</Button>
                            </Typography>
                        </Grid>
                        {this.state.showAlert ? (<Grow className={classes.Alert} in={this.state.showAlert}>
                        <Alert severity={this.state.alertSeverity}>
                            <AlertTitle><IconButton onClick={this.closeAlert}>
                                <Close />
                            </IconButton>{this.state.alertTitle}</AlertTitle>
                            {this.state.alertContent}
                        </Alert>
                    </Grow>) : null}
                        <Grid item container justify="center" direction="column" className={classes.inputCont}>
                            <TextField required fullWidth className={classes.formInput} autoComplete="off" variant="outlined" name="login" label="Логин" value={this.state.login} onInput={this.onInput} />
                            <TextField fullWidth autoComplete="off" required className={classes.formInput} variant="outlined" name="email" label="Почта" value={this.state.email} helperText={this.state.helperText} FormHelperTextProps={{className:classes.helperText}} onInput={this.onInput} />
                            <Grid item>
                                <TextField required className={classes.passwordInput} variant="outlined" name="password" label="Пароль" value={this.state.password} onInput={this.onInput} type={this.state.type} />
                                {this.state.type === "password" ? <IconButton onClick={this.toggleVisibility} className={classes.IconButton}><VisibilityOff /></IconButton>
                                 : <IconButton className={classes.IconButton} onClick={this.toggleVisibility}><Visibility /></IconButton>}
                             </Grid>
                        </Grid>
                        <Grid item>
                            <ButtonGroup size="large">
                                <Button variant="contained" color="primary" type="submit">Ок</Button>
                                <Button variant="contained" color="primary" onClick={this.toggleRegisterModal}>Отмена</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    
                </Paper>
                </form>
            </Modal>
            
            <Modal open={this.state.loginModal} onClose={this.toggleLoginModal}>
                <form id="login-form" onSubmit={this.onLogin}>
                <Paper square className={classes.paper}>
                    <Grid container justify="center" direction="column" spacing={2}>
                        <Grid item>
                            <Typography variant="h3">
                               Войти
                            </Typography>
                            <Typography variant="h4">
                                Нет аккаунта? <Button variant="text" color="secondary" size="large" onClick={this.openRegisterFromLogin}>Зарегистрироваться</Button>
                            </Typography>
                        </Grid>
                        {this.state.showAlert ? (<Grow className={classes.Alert} in={this.state.showAlert}>
                        <Alert severity={this.state.alertSeverity}>
                            <AlertTitle><IconButton onClick={this.closeAlert}>
                                <Close />
                            </IconButton>{this.state.alertTitle}</AlertTitle>
                            {this.state.alertContent}
                        </Alert>
                    </Grow>) : null}
                        <Grid item container justify="center" direction="column" className={classes.inputCont}>
                            <TextField fullWidth required className={classes.formInput} autoComplete="off" variant="outlined" name="login" label="Логин" value={this.state.login} onInput={this.onInput} />
                            <Grid item>
                                <TextField  required className={classes.passwordInput} variant="outlined" name="password" label="Пароль" value={this.state.password} onInput={this.onInput} type={this.state.type} />
                                {this.state.type === "password" ? <IconButton className={classes.IconButton} onClick={this.toggleVisibility}><VisibilityOff /></IconButton>
                                 : <IconButton className={classes.IconButton} onClick={this.toggleVisibility}><Visibility/></IconButton>}
                            </Grid>
                        </Grid>
                        <Grid item container>
                            <ButtonGroup size="large">
                                <Button variant="contained" color="primary" type="submit">Войти</Button>
                                <Button variant="contained" color="primary" onClick={this.toggleLoginModal}>Отмена</Button>
                            </ButtonGroup>
                        </Grid>
                    </Grid>
                </Paper>
                </form>
            </Modal>            
        </div>
    );
    }
}

NavbarButtonGroup.propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired,
    user: PropTypes.object,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    user: state.auth.user
});

export default connect(mapStateToProps, { register, clearErrors, logout, login })(withStyles(styles)(NavbarButtonGroup));