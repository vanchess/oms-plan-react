import React from "react";
import { commissionDecisionService } from "../../services/api/commissionDecisionService";
import { createAction } from "@reduxjs/toolkit";

import { yearSelected } from "../nodeData/nodeDataStore";

export const commissionDecisionGetRequest = createAction('COMMISSION_DECISION_GET_REQUEST');
export const commissionDecisionGetSuccess = createAction('COMMISSION_DECISION_GET_SUCCESS');
export const commissionDecisionGetFailure = createAction('COMMISSION_DECISION_GET_FAILURE');

export const commissionDecisionAddRequest = createAction('COMMISSION_DECISION_ADD_REQUEST');
export const commissionDecisionAddSuccess = createAction('COMMISSION_DECISION_ADD_SUCCESS');
export const commissionDecisionAddFailure = createAction('COMMISSION_DECISION_ADD_FAILURE');

export const commissionDecisionIdSelected = createAction('COMMISSION_DECISION_ID_SELECTED');
export const commissionDecisionIdEdit = createAction('COMMISSION_DECISION_ID_EDIT');


export const commissionDecisionFetch = ({year}) => {
    return async (dispatch) => {
        dispatch(commissionDecisionGetRequest());

        try {
            const data = await commissionDecisionService.getByYear(year);
            dispatch(commissionDecisionGetSuccess(data));
        } catch(error) {
            dispatch(commissionDecisionGetFailure(error));
        }
    }
}

export const commissionDecisionAdd = ({number, date, description}) => {
    return async (dispatch) => {
        dispatch(commissionDecisionAddRequest());

        try {
            const data = await commissionDecisionService.add({number, date, description});
            dispatch(commissionDecisionAddSuccess(data));
            dispatch(commissionDecisionIdSelected(data.data.id));
        } catch(error) {
            dispatch(commissionDecisionAddFailure(error))
        }
    }
}

const initialState = {
    entities: {},
    ids: [],
    selectedId: null,
    editableId: null,
    loading: false,
    error: false
}

export function commissionDecisionReducer(state = initialState, action) {
    switch (action.type) {
        case commissionDecisionGetRequest.type:
            return {
                ...state,
                loading: true
            };
        case commissionDecisionGetSuccess.type:
            const ids = action.payload.entities.map(e => e.id);
            return {
                ...state,
                entities: action.payload.entities.reduce((prev, cur) => {prev[cur.id] = cur; return prev;}, {}),
                ids: ids,
                selectedId: state.selectedId ?? ids.at(-1) ?? null,
                editableId: state.editableId ?? ids.at(-1) ?? null,
                loading: false,
                error: false,
            }
        case commissionDecisionGetFailure.type: 
            return {
                ...state,
                loading: false,
                error: action.payload.error,
            }
        case commissionDecisionAddRequest.type:
            return {
                ...state,
            }
        case commissionDecisionAddSuccess.type:
            return {
                ...state,
                entities: {...state.entities, [action.payload.data.id]:action.payload.data},
                ids: [...state.ids, action.payload.data.id],

            }
        case commissionDecisionAddFailure.type:
            return {
                ...state,
            }
        case commissionDecisionIdSelected.type:
            return {
                ...state,
                selectedId: action.payload,
            }
        case commissionDecisionIdEdit.type:
            return {
                ...state,
                editableId: action.payload,
            }    
        case yearSelected.type:
            return {
                ...state,
                selectedId: null
            }
        default:
            return state;
    }
}