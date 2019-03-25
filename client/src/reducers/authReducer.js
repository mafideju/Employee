import isEmpty from '../validation/isEmpty'

export default (state = {
  isAuthenticated: false,
  user: {}
}, action) => {
  // console.log(action)
  switch (action.type) {
    case 'SET_CURRENT_USER':
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case 'LOGIN_USER':
      return {
        ...state,
        user: action.payload
      };
    default:
      return state;
  }
}