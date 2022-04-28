import { createAction } from '@reduxjs/toolkit'
import { periodService } from '../../services';

export const periodsGetRequest = createAction('PERIOD_GET_REQUEST');
export const periodsGetSuccess = createAction('PERIOD_GET_SUCCESS');
export const periodsGetFailure = createAction('PERIOD_GET_FAILURE');

export const periodFetch = () => {
    return (dispatch) => {
        dispatch(periodsGetRequest);
        periodService.getAll().then(
            periods => dispatch(periodsGetSuccess(periods)),
            error =>  dispatch(periodsGetFailure(error))
        )
    }
}

/* Reducer */
const initialState = {
    entities: {},
    ids: [],
    loading: false,
    error: false,
  };

export function periodReducer(state = initialState, action) {
    switch (action.type) {
      case periodsGetRequest.type:
        return { ...state,
          loading: true
        };
      case periodsGetSuccess.type:  
        return { ...state,
          entities: action.payload.entities.reduce((o, item) => {o[item.id] = item; return o;}, {}),
          ids: action.payload.entities.map(e => e.id),
          loading: false
        };
      case periodsGetFailure.type:
        return { ...state,
          error: action.error,
          loading: false
        };
      default:
        return state
    }
  }