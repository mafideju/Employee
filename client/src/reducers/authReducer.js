// import { registerUser } from '../actions';

export default (state = {
  isAuthenticated: false,
  user: {}
}, action) => {
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}