export const registerUser = (userData) => {
  return {
    type: 'SET_CURRENT_USER',
    payload: userData
  }
}

// export const signOut = () => {
//   return {
//     type: 'SIGN_OUT'
//   }
// }

// export const fetchStreams = () => async dispatch => {
//   const response = await streams.get('/streams');
//   dispatch({
//     type: 'FETCH_STREAMS',
//     payload: response.data
//   })
// }