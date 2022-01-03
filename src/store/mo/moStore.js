import { createAction } from '@reduxjs/toolkit'
import { moService } from '../../services';

export const moGetRequest = createAction('MEDICAL_INSTITUTION_GET_REQUEST');
export const moGetSuccess = createAction('MEDICAL_INSTITUTION_GET_SUCCESS');
export const moGetFailure = createAction('MEDICAL_INSTITUTION_GET_FAILURE');

export const moHavingDepartmentsIdsGetRequest = createAction('MEDICAL_INSTITUTION_HAVING_DEPARTMENTS_IDS_GET_REQUEST');
export const moHavingDepartmentsIdsGetSuccess = createAction('MEDICAL_INSTITUTION_HAVING_DEPARTMENTS_IDS_GET_SUCCESS');
export const moHavingDepartmentsIdsGetFailure = createAction('MEDICAL_INSTITUTION_HAVING_DEPARTMENTS_IDS_GET_FAILURE');

export const moFetch = (page, perPage) => {
  return (dispatch) => {
    dispatch(moGetRequest());
    
    moService.getAll(page, perPage).then(
        moCollection => dispatch(moGetSuccess(moCollection)),
        error => {
            dispatch(moGetFailure(error));
        }
      );
  }
}

export const moIdsHavingDepartmentsFetch = (departmentTypes = []) => {
  return (dispatch) => {
    dispatch(moHavingDepartmentsIdsGetRequest());
    
    moService.getIdsHavingDepartments(departmentTypes).then(
        payload => dispatch(moHavingDepartmentsIdsGetSuccess(payload)),
        error => {
            dispatch(moHavingDepartmentsIdsGetFailure(error));
        }
      );
  }
}

/* Reducer */
const initialState = {
  entities: {},
  ids: [],
  idsHavingDepartments: [],
  loading: false,
  error: false,
};

export function moReducer(state = initialState, action) {
  //console.log(action);
  switch (action.type) {
    case moGetRequest.type:
      return { ...state,
        loading: true
      };
    case moGetSuccess.type:  
      return { ...state,
        entities: action.payload.entities.reduce((o, item) => {o[item.id] = item; return o;}, {}),
        ids: action.payload.entities.map(e => e.id),
        loading: false
      };
    case moGetFailure.type:
      return { ...state,
        error: action.error,
        loading: false
      };
    case moHavingDepartmentsIdsGetRequest.type:
      return { ...state,
        loadingHavingDepartments: true
      };
    case moHavingDepartmentsIdsGetSuccess.type:  
      return { ...state,
        idsHavingDepartments: action.payload,
        loadingHavingDepartments: false
      };
    case moHavingDepartmentsIdsGetFailure.type:
      return { ...state,
        error: action.error,
        loadingHavingDepartments: false
      };
    default:
      return state
  }
}