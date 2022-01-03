import { createAction } from '@reduxjs/toolkit'
import { medicalAssistanceTypeService } from '../../services';

export const medicalAssistanceTypeGetRequest = createAction('MEDICAL_ASSISTANCE_TYPE_GET_REQUEST');
export const medicalAssistanceTypeGetSuccess = createAction('MEDICAL_ASSISTANCE_TYPE_GET_SUCCESS');
export const medicalAssistanceTypeGetFailure = createAction('MEDICAL_ASSISTANCE_TYPE_GET_FAILURE');

export const medicalAssistanceTypeFetch = () => {
  return (dispatch) => {
    dispatch(medicalAssistanceTypeGetRequest());
    
    medicalAssistanceTypeService.getAll().then(
        payload => dispatch(medicalAssistanceTypeGetSuccess(payload)),
        error => {
            dispatch(medicalAssistanceTypeGetFailure(error));
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

export function medicalAssistanceTypeReducer(state = initialState, action) {
  switch (action.type) {
    case medicalAssistanceTypeGetRequest.type:
      return { ...state,
        loading: true
      };
    case medicalAssistanceTypeGetSuccess.type:  
      return { ...state,
        entities: action.payload.entities.reduce((o, item) => {o[item.id] = item; return o;}, {}),
        ids: action.payload.entities.map(e => e.id),
        loading: false
      };
    case medicalAssistanceTypeGetFailure.type:
      return { ...state,
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}