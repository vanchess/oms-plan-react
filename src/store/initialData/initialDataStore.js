import { createAction } from '@reduxjs/toolkit'
import { categoryTreeService } from '../../services';

export const dataForNodeIdGetRequest = createAction('INITIAL_DATA_NODE_GET_REQUEST');
export const dataForNodeIdGetSuccess = createAction('INITIAL_DATA_NODE_GET_SUCCESS');
export const dataForNodeIdGetFailure = createAction('INITIAL_DATA_NODE_GET_FAILURE');

export const dataForNodeUpdateRequest = createAction('INITIAL_DATA_NODE_UPDATED_REQUEST');
export const dataForNodeUpdateSuccess = createAction('INITIAL_DATA_NODE_UPDATED_SUCCESS');
export const dataForNodeUpdateFailure = createAction('INITIAL_DATA_NODE_UPDATED_FAILURE');

import { uniqueId } from '../../_helpers/uniqueId';

export const dataForNodeIdFetch = ({nodeId, year}) => {
  return (dispatch) => {
    dispatch(dataForNodeIdGetRequest());

    categoryTreeService.getInitDataForNodeId(nodeId, year).then(
        data => {
            dispatch(dataForNodeIdGetSuccess({nodeId, entities: data.entities}));
        },
        error => {
            dispatch(dataForNodeIdGetFailure(error));
        }
      );
  }
}

export const dataForNodeUpdate = ({year, moId, plannedIndicatorId, value}) => {
    return (dispatch) => {
        const uId = uniqueId('initdata');
        dispatch(dataForNodeUpdateRequest({id:uId, year, moId, plannedIndicatorId, value}));
        
        categoryTreeService.setInitDataPlannedIndicator({year, moId, plannedIndicatorId, value}).then(
            data => {
                // console.log(data.data.id);
                dispatch(dataForNodeUpdateSuccess({lastId:uId, id:data.data.id, year, moId, plannedIndicatorId, value}));
            },
            data => {
                // console.log('error',data);
                dispatch(dataForNodeUpdateFailure({lastId:uId, id:uId, year, moId, plannedIndicatorId, value, error:data.error }));
            }
        );
    }
}


/* Reducer */
const initialState = {
  entities: {},
  loading: false,
  error: false,
};

export function initialDataReducer(state = initialState, action) {
  switch (action.type) {
    case dataForNodeIdGetRequest.type:
      return { ...state,
        loading: true
      };
    case dataForNodeIdGetSuccess.type:  
      return { ...state,
        entities: { ...state.entities,
            ...action.payload.entities,
        },
        loading: false
      };
    case dataForNodeIdGetFailure.type:
      return { ...state,
        error: action.error,
        loading: false
      };
    case dataForNodeUpdateRequest.type:
        return nodeUpdate(state, action.payload, 'saving');
    case dataForNodeUpdateSuccess.type:
        return nodeUpdate(state, action.payload, 'saved');
    case dataForNodeUpdateFailure.type:
        return nodeUpdate(state, action.payload, 'error');
    default:
      return state
  }
}

const nodeUpdate = (state, {id, lastId, year, moId, plannedIndicatorId, value}, status) => {
    const newState = {...state,
        entities: { ...state.entities }
    }
    if (id) {
        newState.entities[id] = {id, year, mo_id:moId, planned_indicator_id:plannedIndicatorId, value, status};
    }
    if (lastId && lastId !== id) {
        delete newState.entities[lastId];
    }
    return newState;
}