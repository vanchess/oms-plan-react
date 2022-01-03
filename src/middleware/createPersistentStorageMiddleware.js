import { AUTH_USER_LOGIN_SUCCESS, AUTH_USER_LOGOUT_SUCCESS } from '../constants/authConstants.js'

export function createPersistentStorageMiddleware(storage) {
    return ({ getState }) => next => action => {
        const result = next(action);
        switch (result.type) {
            case AUTH_USER_LOGIN_SUCCESS:  
              storage.setItem('auth', getState().auth);
              break;
            case AUTH_USER_LOGOUT_SUCCESS:  
              storage.removeItem('auth');
              break;
        }
        return result;
    }
}