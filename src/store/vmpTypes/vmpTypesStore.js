import { createAction } from "@reduxjs/toolkit";
import { vmpTypesService } from "../../services/api/vmpTypesService";

export const vmpTypesGetRequest = createAction('VMP_TYPES_GET_REQUEST');
export const vmpTypesGetSuccess = createAction('VMP_TYPES_GET_SUCCESS');
export const vmpTypesGetFailure = createAction('VMP_TYPES_GET_FAILURE');

export const vmpTypesFetch = () => {
    return (dispatch) => {
        dispatch(vmpTypesGetRequest);

        vmpTypesService.getAll().then(
            payload => dispatch(vmpTypesGetSuccess(payload)),
            error => dispatch(vmpTypesGetFailure(error))
        );
    }
}

/* Reducer */
const initialState = {
    entities: {},
    ids: [],
    loading: false,
    error: false
}

export function vmpTypesReducer(state = initialState, action) {
    switch(action.type) {
        case vmpTypesGetRequest.type:
            return { ...state,
                loading: true
            }
        case vmpTypesGetSuccess.type:
            return { ...state,
                entities: action.payload.entities.reduce((o, item) => { o[item.id] = item; return o; }, {}),
                ids: action.payload.entities.map(e => e.id),
                loading: false,
                error: false
            }
        case vmpTypesGetFailure.type:
            return { ...state,
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}