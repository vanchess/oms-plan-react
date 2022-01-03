import { createAction } from '@reduxjs/toolkit'
import { plannedIndicatorService } from '../../services';

export const plannedIndicatorsGetRequest = createAction('PLANNED_INDICATORS_GET_REQUEST');
export const plannedIndicatorsGetSuccess = createAction('PLANNED_INDICATORS_GET_SUCCESS');
export const plannedIndicatorsGetFailure = createAction('PLANNED_INDICATORS_GET_FAILURE');

export const plannedIndicatorsFetch = () => {
  return (dispatch) => {
    dispatch(plannedIndicatorsGetRequest());
    
    plannedIndicatorService.getAll().then(
        plannedIndicatorCollection => dispatch(plannedIndicatorsGetSuccess(plannedIndicatorCollection)),
        error => {
            dispatch(plannedIndicatorsGetFailure(error));
        }
      );
  }
}

/* Reducer */
const initialState = {
  entities: {},
  loading: false,
  error: false,
};

export function plannedIndicatorReducer(state = initialState, action) {
  switch (action.type) {
    case plannedIndicatorsGetRequest.type:
      return { ...state,
        loading: true
      };
    case plannedIndicatorsGetSuccess.type:  
      return { ...state,
        entities: { ...action.payload.entities },
        loading: false
      };
    case plannedIndicatorsGetFailure.type:
      return { ...state,
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}