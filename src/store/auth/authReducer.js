import { AUTH_USER_LOGIN_REQUEST, AUTH_USER_LOGIN_SUCCESS, AUTH_USER_LOGIN_FAILURE } from '../../constants/authConstants.js'
import { AUTH_USER_LOGOUT_REQUEST, AUTH_USER_LOGOUT_SUCCESS, AUTH_USER_LOGOUT_FAILURE } from '../../constants/authConstants.js'

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: false,
};

export function authReducer(state = initialState, action) {
  if (action.payload && action.payload.error && action.payload.error.status === 401) {
    return { ...state,
        ...initialState
    };
  }
  switch (action.type) {
    case AUTH_USER_LOGIN_REQUEST:
      return { ...state,
        loading: true
      };
    case AUTH_USER_LOGIN_SUCCESS:  
      return { ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
        error: false,
      };
    case AUTH_USER_LOGIN_FAILURE:
      return { ...state,
        error: action.error,
        loading: false
      };
    case AUTH_USER_LOGOUT_REQUEST:
      return { ...state,
        loading: true
      };
    case AUTH_USER_LOGOUT_SUCCESS:  
      return { ...state,
        ...initialState
      };
    case AUTH_USER_LOGOUT_FAILURE:
      return { ...state,
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}