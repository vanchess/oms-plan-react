import { createAction } from '@reduxjs/toolkit'

export const titleUpdated = createAction('TITLE_UPDATED');

export const setTitle = (payload) => {
    return (dispatch) => {
        if (payload.title) {
            document.title = `${payload.title} - Объемы и стоимость`;
        } else {
            document.title = 'Объемы и стоимость';
        }
        dispatch(titleUpdated(payload))
    }
}

const initialState = {
  title: '',
};

export function curPageReducer(state = initialState, action) {
  switch (action.type) {
    case titleUpdated.type:
      return { ...state,
        title: action.payload.title
      };
    default:
      return state
  }
}