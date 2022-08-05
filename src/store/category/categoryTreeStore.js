import { createAction } from '@reduxjs/toolkit'
import { categoryTreeService } from '../../services/api/categoryTreeService'

export const categoryTreeForNodeIdGetRequest = createAction('CATEGORY_TREE_FOR_NODE_GET_REQUEST');
export const categoryTreeForNodeIdGetSuccess = createAction('CATEGORY_TREE_FOR_NODE_GET_SUCCESS');
export const categoryTreeForNodeIdGetFailure = createAction('CATEGORY_TREE_FOR_NODE_GET_FAILURE');

export const categoryTreeFetch = ({nodeId}) => {
    return (dispatch) => {
        dispatch(categoryTreeForNodeIdGetRequest({nodeId}));

        categoryTreeService.getTree(nodeId).then(
            value => dispatch(categoryTreeForNodeIdGetSuccess({nodeId, value})),
            error => dispatch(categoryTreeForNodeIdGetFailure({nodeId, ...error}))
        )
    }
}

/* Reducer */
const initialState = {
    entities: {},
}

export function categoryTreeReducer(state = initialState, action) {
    switch (action.type) {
        case categoryTreeForNodeIdGetRequest.type:  
        return { ...state,
            entities: { ...state.entities,
                [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                    loading: true
                }
            }
        };
        case categoryTreeForNodeIdGetSuccess.type:
        return { ...state,
            entities: { ...state.entities,
                [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                    tree: action.payload.value,
                    error: false,
                    loading: false
                }
            }
        };
        case categoryTreeForNodeIdGetFailure.type:
        return { ...state,
            entities: { ...state.entities,
                [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                    error: action.payload.error,
                    loading: false
                }
            }
        };
        default:
            return state;
    }
}