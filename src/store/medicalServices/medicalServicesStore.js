import { createAction } from '@reduxjs/toolkit'
import { medicalServicesService } from '../../services';

export const medicalServicesGetRequest = createAction('MEDICAL_SERVICES_GET_REQUEST');
export const medicalServicesGetSuccess = createAction('MEDICAL_SERVICES_GET_SUCCESS');
export const medicalServicesGetFailure = createAction('MEDICAL_SERVICES_GET_FAILURE');

export const medicalServicesFetch = () => {
  return (dispatch) => {
    dispatch(medicalServicesGetRequest());
    
    medicalServicesService.getAll().then(
        payload => dispatch(medicalServicesGetSuccess(payload)),
        error => {
            dispatch(medicalServicesGetFailure(error));
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

export function medicalServicesReducer(state = initialState, action) {
  switch (action.type) {
    case medicalServicesGetRequest.type:
      return { ...state,
        loading: true
      };
    case medicalServicesGetSuccess.type:  
      return { ...state,
        entities: action.payload.entities.reduce((o, item) => {o[item.id] = item; return o;}, {}),
        ids: action.payload.entities.map(e => e.id),
        loading: false
      };
    case medicalServicesGetFailure.type:
      return { ...state,
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}