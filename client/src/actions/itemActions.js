import { ADD_ITEM, GET_ITEMS, DELETE_ITEM, SET_LOADING} from './types';
import axios from 'axios';
import { returnErrors } from './errorActions';
import { tokenConfig } from './authActions';

// import { v4 as uuid } from 'uuid';

export const getItems = () => dispatch => {
    axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, GET_ITEMS)));

}

export const addItem = name => (dispatch, getState) => {

    axios.post('/api/items', { name }, tokenConfig(getState))
        .then(res => {
            dispatch({
            type: ADD_ITEM,
            payload: res.data
            })
        })
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status, ADD_ITEM));
        })
    
}

export const deleteItem = id => (dispatch, getState) => {
    
    axios.delete(`/api/items/${id}`, tokenConfig(getState))
        .then(res => {
            if(res.data.success) {
                dispatch({
                    type: DELETE_ITEM,
                    payload: id
                })
            } else {
                alert("Something went wrong deleting the item")
            }
        })
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status, DELETE_ITEM)))
    
}

export const setLoading = () => dispatch => {
    dispatch({
        type: SET_LOADING
    })
}