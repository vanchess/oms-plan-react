import { createAction } from '@reduxjs/toolkit'
import { moDepartmentService } from '../../services';

export const moDepartmentGetRequest = createAction('MO_DEPARTMENT_GET_REQUEST');
export const moDepartmentGetSuccess = createAction('MO_DEPARTMENT_GET_SUCCESS');
export const moDepartmentGetFailure = createAction('MO_DEPARTMENT_GET_FAILURE');

export const moDepartmentFetch = (departmentTypes = []) => {
  return (dispatch) => {
    dispatch(moDepartmentGetRequest());
    
    moDepartmentService.getAll(departmentTypes).then(
        payload => dispatch(moDepartmentGetSuccess(payload)),
        error => {
            dispatch(moDepartmentGetFailure(error));
        }
      );
  }
}

/* Reducer */
const initialState = {
  entities: {},
  ids: [],
  loading: false,
  error: false,
};

export function moDepartmentReducer(state = initialState, action) {
  switch (action.type) {
    case moDepartmentGetRequest.type:
      return { ...state,
        loading: true
      };
    case moDepartmentGetSuccess.type:  
      return { ...state,
        entities: action.payload.entities.reduce((o, item) => {o[item.id] = item; return o;}, {}),
        ids: action.payload.entities.map(e => e.id),
        loading: false
      };
    case moDepartmentGetFailure.type:
      return { ...state,
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}