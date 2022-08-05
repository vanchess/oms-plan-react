import { createAction } from '@reduxjs/toolkit'
import { indicatorService } from '../../services';

export const indicatorsGetRequest = createAction('INDICATORS_GET_REQUEST');
export const indicatorsGetSuccess = createAction('INDICATORS_GET_SUCCESS');
export const indicatorsGetFailure = createAction('INDICATORS_GET_FAILURE');

export const indicatorsFetch = () => {
  return (dispatch) => {
    dispatch(indicatorsGetRequest());
    
    indicatorService.getAll().then(
        moCollection => dispatch(indicatorsGetSuccess(moCollection)),
        error => {
            dispatch(indicatorsGetFailure(error));
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

export function indicatorReducer(state = initialState, action) {
  switch (action.type) {
    case indicatorsGetRequest.type:
      return { ...state,
        loading: true
      };
    case indicatorsGetSuccess.type:  
      return { ...state,
        entities: action.payload.entities.reduce((o, item) => {o[item.id] = item; return o;}, {}),
        ids: action.payload.entities.map(e => e.id),
        loading: false,
        error: false
      };
    case indicatorsGetFailure.type:
      return { ...state,
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}