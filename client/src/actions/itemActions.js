import { ADD_ITEM, GET_ITEMS, DELETE_ITEM, SET_LOADING} from './types';
import axios from 'axios';

// import { v4 as uuid } from 'uuid';

export const getItems = () => dispatch => {
    axios.get('/api/items')
        .then(res => dispatch({
            type: GET_ITEMS,
            payload: res.data
        }))
        .catch(err => alert(err))

}

export const addItem = name => dispatch => {

    axios.post('/api/items', { name })
        .then(res => {
            dispatch({
            type: ADD_ITEM,
            payload: res.data
            })
        })
        .catch(err => alert(err.msg))
    
}

export const deleteItem = _id => dispatch => {
    
    axios.delete(`/api/items/${_id}`)
        .then(res => {
            if(res.data.success) {
                dispatch({
                    type: DELETE_ITEM,
                    payload: _id
                })
            } else {
                alert("Something went wrong deleting the item")
            }
        })
    
}

export const setLoading = () => dispatch => {
    dispatch({
        type: SET_LOADING
    })
}