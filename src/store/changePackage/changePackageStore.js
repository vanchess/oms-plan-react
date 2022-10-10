import React from "react";
import { createAction } from "@reduxjs/toolkit";

import { changePackageService } from "../../services/api/changePackageService";

export const changePackageGetRequest = createAction('CHANGE_PACKAGE_GET_REQUEST');
export const changePackageGetSuccess = createAction('CHANGE_PACKAGE_GET_SUCCESS');
export const changePackageGetFailure = createAction('CHANGE_PACKAGE_GET_FAILURE');

let controller = new AbortController();
export const changePackageFetch = () => {
    return async (dispatch) => {
        controller.abort();
        controller = new AbortController();
        
        dispatch(changePackageGetRequest());

        try {
            const data = await changePackageService.getAll(controller.signal);
            dispatch(changePackageGetSuccess(data));
        } catch(error) {
            dispatch(changePackageGetFailure(error));
        }
    }
}

const initialState = {
    entities: {},
    ids: [],
    loading: false,
    error: false
}

export function changePackageReducer(state = initialState, action) {
    switch (action.type) {
        case changePackageGetRequest.type:
            return {
                ...state,
                loading: true
            };
        case changePackageGetSuccess.type:
            const ids = action.payload.entities.map(e => e.id);
            return {
                ...state,
                entities: action.payload.entities.reduce((prev, cur) => {prev[cur.id] = cur; return prev;}, {}),
                ids: ids,
                loading: false,
                error: false,
            }
        case changePackageGetFailure.type: 
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        default:
            return state;
    }
}