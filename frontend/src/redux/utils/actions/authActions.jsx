import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from './types';
import setAuthToken from '../../utils/setAuthToken';

export const setCurrentUser = decoded => {
    return {
      type: SET_CURRENT_USER,
      payload: decoded
    };
  }; // User loading
  export const setUserLoading = () => {
    return {
      type: USER_LOADING
    };
  }; // Log user out
  export const logoutUser = () => dispatch => {
    // Remove token from local storage
    localStorage.removeItem('jwtToken');
    // Remove auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
  };