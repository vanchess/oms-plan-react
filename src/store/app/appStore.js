import { createAction } from '@reduxjs/toolkit'

export const appInitBegin = createAction('APP_INIT_BEGIN');

/* Reducer */
const initialState = {
    appInitBegin: false
};
  
export function appReducer(state = initialState, action) {
    switch (action.type) {
      case appInitBegin.type:
        return { ...state,
            appInitBegin: true
        };
      default:
        return state;
    }
}