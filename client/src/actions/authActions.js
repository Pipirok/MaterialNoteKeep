import axios from 'axios';
import {
    LOGOUT_SUCCESS,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    USER_LOADED,
    USER_LOADING,
    REGISTER_FAIL,
    REGISTER_SUCCESS,
    AUTH_ERROR    
} from './types';
import { returnErrors } from './errorActions';

// Check token, load user
export const loadUser = () => (dispatch, getState) => {
    dispatch({ type: USER_LOADING });

    axios.get('/api/auth/user', tokenConfig(getState))
        .then(res => dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({
            type: AUTH_ERROR
        })
    });
}

export const register = ({ login, email, password }) => dispatch => {
    // headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // request body
    const body = JSON.stringify({ login, email, password });

    axios.post('/api/users', body, config)
        .then(res => dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, 'REGISTER_FAIL'));
            dispatch({
                type: REGISTER_FAIL
            });
        })
}

export const login = ( login, password ) => dispatch => {

     // headers
     const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // request body
    const body = JSON.stringify({ login, password });

    axios.post('/api/auth', body, config)
        .then(res => dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, LOGIN_FAIL));
            dispatch({ type: LOGIN_FAIL })
        })
}

export const logout = () => dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS
    })
}

// setup config, headers, config
export const tokenConfig = (getState) => {

    // get token from state
    const token = getState().auth.token;

    // set headers
    const config = {
        headers: {
            "Content-Type": "application/json"
        }
    }

    // if token, add to headers
    if(token) {
        config.headers['x-auth-token'] = token;
    }
    return config;
}
