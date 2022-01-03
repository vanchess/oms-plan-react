import { createAction } from '@reduxjs/toolkit'
import { hospitalBedProfilesService } from '../../services';

export const hospitalBedProfilesGetRequest = createAction('HOSPITAL_BED_PROFILES_GET_REQUEST');
export const hospitalBedProfilesGetSuccess = createAction('HOSPITAL_BED_PROFILES_GET_SUCCESS');
export const hospitalBedProfilesGetFailure = createAction('HOSPITAL_BED_PROFILES_GET_FAILURE');

export const hospitalBedProfilesFetch = () => {
  return (dispatch) => {
    dispatch(hospitalBedProfilesGetRequest());
    
    hospitalBedProfilesService.getAll().then(
        moCollection => dispatch(hospitalBedProfilesGetSuccess(moCollection)),
        error => {
            dispatch(hospitalBedProfilesGetFailure(error));
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

export function hospitalBedProfilesReducer(state = initialState, action) {
  switch (action.type) {
    case hospitalBedProfilesGetRequest.type:
      return { ...state,
        loading: true
      };
    case hospitalBedProfilesGetSuccess.type:  
      return { ...state,
        entities: action.payload.entities.reduce((o, item) => {o[item.id] = item; return o;}, {}),
        ids: action.payload.entities.map(e => e.id),
        loading: false
      };
    case hospitalBedProfilesGetFailure.type:
      return { ...state,
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}