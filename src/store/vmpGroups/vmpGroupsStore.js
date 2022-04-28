import { createAction } from "@reduxjs/toolkit";
import { vmpGroupsService } from "../../services/api/vmpGroupsService";

export const vmpGroupsGetRequest = createAction('VMP_GROUPS_GET_REQUEST');
export const vmpGroupsGetSuccess = createAction('VMP_GROUPS_GET_SUCCESS');
export const vmpGroupsGetFailure = createAction('VMP_GROUPS_GET_FAILURE');

export const vmpGroupsFetch = () => {
    return dispatch => {
        dispatch(vmpGroupsGetRequest());

        vmpGroupsService.getAll().then(
            payload => dispatch(vmpGroupsGetSuccess(payload)),
            error => dispatch(vmpGroupsGetFailure(error))
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

export function vmpGroupsReducer(state = initialState, action) {
    switch (action.type) {
        case vmpGroupsGetRequest.type:
            return { ...state,
                loading: true,
            }
        case vmpGroupsGetSuccess.type:
            return { ...state, 
                entities: action.payload.entities.reduce((o,item) => {o[item.id] = item; return o;},{}),
                ids: action.payload.entities.map(e => e.id),
                loading: false,
                error: false,
            }
        case vmpGroupsGetFailure.type:
            return { ...state, 
                loading: false,
                error: action.error
            }
        default:
            return state;
    }
}