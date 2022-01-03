// import { createAction } from '@reduxjs/toolkit'
import { logout } from '../auth/authAction'
import { uniqueId } from '../../_helpers/uniqueId';

// export const titleUpdated = createAction('TITLE_UPDATED');
/*
export const handleError = (payload) => {
    return (dispatch) => {
        console.log(payload);
        if (payload.status === 401) {
            dispatch(logout());
        }
    }
}
*/
const initialState = {
    entities: {},
};

export function errorReducer(state = initialState, action) {
  if (action.payload && action.payload.error) {
    console.log(action);
    
    const id = uniqueId()
    return { ...state,
        entities: {...state.entities,
            [id]: {
                id: id,
                status: action.payload.error.status,
                statusText: action.payload.error.statusText,
                msg: action.payload.error.data.error,
                // notifyType:
                // level: Fatal | Error | Warn | Info | Debug               
            }
        }
    };
  }
  switch (action.type) {
    
    //case titleUpdated.type:
    //  return { ...state,
    //    title: action.payload.title
    //  };
    default:
      return state
  }
}