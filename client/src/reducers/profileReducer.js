export default (state = {
  profile: null,
  profiles: null,
  loading: false
}, action) => {
  switch (action.type) {
    case 'PROFILE_LOADING':
      return {
        ...state,
        loading: true
      };
    case 'GET_PROFILE':
      return {
        ...state,
        profile: action.payload,
        loading: false
      };
    case 'GET_PROFILES':
      return action.payload;
    case 'PROFILE_NOT_FOUND':
      return action.payload;
    case 'CLEAR_CURRENT_PROFILE':
      return {
        ...state,
        profile: null
      };
    default:
      return state;
  }
}