import axios from 'axios';
import jwt_decode from 'jwt-decode';
import history from '../history';
import setAuthToken from '../common/setAuthToken';


export const registerUser = userData => dispatch => {
  axios
    .post('/users/cadastro', userData)
    .then(() => {
      history.push('/login');
    })
    .catch(err => dispatch({
      type: 'GET_ERRORS',
      payload: err.response.data
    }))
}

export const loginUser = userData => dispatch => {
  axios
    .post('/users/login', userData)
    .then(res => {
      const { token } = res.data;
      const decoded = jwt_decode(token)
      localStorage.setItem('jwtToken', token)
      setAuthToken(token)
      dispatch(setCurrentUser(decoded))
    })
    .catch(err => dispatch({
      type: 'GET_ERRORS',
      payload: err.response.data
    }))
}

export const logoutUser = () => dispatch => {
  localStorage.removeItem('jwtToken');
  setAuthToken(false);
  dispatch(setCurrentUser({}))
}

export const setCurrentUser = decoded => {
  return {
    type: 'SET_CURRENT_USER',
    payload: decoded
  }
}