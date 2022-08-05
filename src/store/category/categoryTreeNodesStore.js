import { createAction } from '@reduxjs/toolkit'
import { categoryTreeService } from '../../services/api/categoryTreeService'

export const categoryTreeNodesGetRequest = createAction('CATEGORY_TREE_NODES_GET_REQUEST');
export const categoryTreeNodesGetSuccess = createAction('CATEGORY_TREE_NODES_GET_SUCCESS');
export const categoryTreeNodesGetFailure = createAction('CATEGORY_TREE_NODES_GET_FAILURE');

export const categoryTreeNodesFetch = () => {
    return (dispatch) => {
        dispatch(categoryTreeNodesGetRequest());

        categoryTreeService.getTreeNodes().then(
            dataCollection => dispatch(categoryTreeNodesGetSuccess(dataCollection)),
            error => dispatch(categoryTreeNodesGetFailure(error))
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

export function categoryTreeNodesReducer(state = initialState, action) {
    switch (action.type) {
        case categoryTreeNodesGetRequest.type:
            return { ...state,
                loading: true,
            }
        case categoryTreeNodesGetSuccess.type:
            return { ...state,
                entities: action.payload.entities.reduce((o, item) => {o[item.id] = item; return o;}, {}),
                ids: action.payload.entities.map(item => item.id),
                loading: false,
                error: false,
            }
        case categoryTreeNodesGetFailure.type:
            return { ...state,
                error: action.error,
                loading: false,
            }
        default:
            return state;
    }
}