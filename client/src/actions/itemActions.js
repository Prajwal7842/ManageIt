import axios from 'axios';
import { GET_ITEMS, ADD_ITEM, DELETE_ITEM, ITEMS_LOADING, REFRESH_ITEMS } from './types';
import { tokenConfig } from './authActions';
import { returnErrors } from './errorActions';

export const getItems = () => dispatch => {
  dispatch(setItemsLoading());
  axios
    .get('/api/complains')
    .then(res =>
      dispatch({
        type: GET_ITEMS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const refreshItems = items => dispatch => {
  // console.log(items)
  if(items.type==='add'){
    axios
      .get(`/api/complains/${items.complainId}`)
      .then(res=>{
        const payload={
          data: res.data,
          type: "add"
        }
        dispatch({
          type: REFRESH_ITEMS,
          payload: payload
        })})
  }
  else{
    dispatch({
      type: REFRESH_ITEMS,
      payload: items
    })
  }
};

export const addItem = item => (dispatch, getState) => {
  axios
    .post('/api/complains', item, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: ADD_ITEM,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const deleteItem = id => (dispatch, getState) => {
  axios
    .delete(`/api/complains/${id}`, tokenConfig(getState))
    .then(res =>
      dispatch({
        type: DELETE_ITEM,
        payload: id
      })
    )
    .catch(err =>
      dispatch(returnErrors(err.response.data, err.response.status))
    );
};

export const setItemsLoading = () => {
  return {
    type: ITEMS_LOADING
  };
};
