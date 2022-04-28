import { createAction } from '@reduxjs/toolkit';
import { careProfilesService } from '../../services/api/careProfilesService';

export const careProfilesGetRequest = createAction('CARE_PROFILES_GET_REQUEST');
export const careProfilesGetSuccess = createAction('CARE_PROFILES_GET_SUCCESS');
export const careProfilesGetFailure = createAction('CARE_PROFILES_GET_FAILURE');

export const careProfilesFetch = () => {
    return (dispatch) => {
        dispatch(careProfilesGetRequest());

        careProfilesService.getAll().then(
            dataCollection => dispatch(careProfilesGetSuccess(dataCollection)),
            error => dispatch(careProfilesGetFailure(error))
        )
    }
}

/* Reducer */
const initialState = {
    entities: {},
    ids: [],
    loading: false,
    error: false,
}

export function careProfilesReducer(state = initialState, action) {
    switch (action.type) {
        case careProfilesGetRequest.type:
            return { ...state,
                loading: true,
            }
        case careProfilesGetSuccess.type:
            return { ...state,
                entities: action.payload.entities.reduce((o, item) => {o[item.id] = item; return o;}, {}),
                ids: action.payload.entities.map(item => item.id),
                loading: false,
                error: false,
            }
        case careProfilesGetFailure.type:
            return { ...state,
                error: action.error,
                loading: false,
            }
        default:
            return state;
    }
}