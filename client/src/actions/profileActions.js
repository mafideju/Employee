import axios from 'axios';

export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/profile')
    .then(res => dispatch({
      type: 'GET_PROFILE',
      payload: res.data
    }))
    .catch(err => dispatch({
      type: 'GET_PROFILE',
      payload: {}
    }))
}

export const setProfileLoading = () => {
  return {
    type: 'PROFILE_LOADING'
  }
}

export const clearCurrentProfile = () => {
  return {
    type: 'CLEAR_CURRENT_PROFILE'
  }
}