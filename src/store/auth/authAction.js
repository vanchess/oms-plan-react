import { setToken } from '../../_helpers/auth-token';
import { authService } from '../../services';
import { AUTH_USER_LOGIN_REQUEST, AUTH_USER_LOGIN_SUCCESS, AUTH_USER_LOGIN_FAILURE } from '../../constants/authConstants.js'
import { AUTH_USER_LOGOUT_REQUEST, AUTH_USER_LOGOUT_SUCCESS, AUTH_USER_LOGOUT_FAILURE } from '../../constants/authConstants.js'

export const authLoginRequest = () => {
  return { type: AUTH_USER_LOGIN_REQUEST }
};

export const authLoginSuccess = (payload) => {
  return { type: AUTH_USER_LOGIN_SUCCESS, payload: payload}
};

export const authLoginFailure = (error) => {
  return { type: AUTH_USER_LOGIN_FAILURE, payload: {error: error} }
};

export const login = (email, password) => {
  return (dispatch) => {
    dispatch(authLoginRequest());
    authService.login(email, password).then(
        response  => { 
            const auth = {
                token: response.data.access_token,
                user: response.data.user
            }
            setToken(auth.token);
            dispatch(authLoginSuccess(auth));
        },
        error => dispatch(authLoginFailure(error))
      );
  }
}

export const authLogoutRequest = () => {
  return { type: AUTH_USER_LOGOUT_REQUEST }
};

export const authLogoutSuccess = (payload) => {
  return { type: AUTH_USER_LOGOUT_SUCCESS, payload: payload}
};

export const authLogoutFailure = (error) => {
    console.log('authLogoutFailure');
  return { type: AUTH_USER_LOGOUT_FAILURE, error: error }
};

export const logout = () => {
  return (dispatch) => {
    console.log('authLogoutRequest');
    dispatch(authLogoutRequest());
    authService.logout().then(
        response  => {
            console.log('authLogoutSuccess');
            dispatch(authLogoutSuccess());
            setToken(null);
        },
        error => dispatch(authLogoutFailure(error))
      );
  }
}