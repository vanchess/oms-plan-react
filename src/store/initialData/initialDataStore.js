import { createAction } from '@reduxjs/toolkit'
import { categoryTreeService } from '../../services';
import { initialDataLoadedService } from '../../services/api/initialDataLoadedService';

export const dataForNodeIdGetRequest = createAction('INITIAL_DATA_NODE_GET_REQUEST');
export const dataForNodeIdGetSuccess = createAction('INITIAL_DATA_NODE_GET_SUCCESS');
export const dataForNodeIdGetFailure = createAction('INITIAL_DATA_NODE_GET_FAILURE');

export const dataForNodeUpdateRequest = createAction('INITIAL_DATA_NODE_UPDATED_REQUEST');
export const dataForNodeUpdateSuccess = createAction('INITIAL_DATA_NODE_UPDATED_SUCCESS');
export const dataForNodeUpdateFailure = createAction('INITIAL_DATA_NODE_UPDATED_FAILURE');

export const loadedNodeIdsRequest = createAction('LOADED_NODE_IDS_REQUEST');
export const loadedNodeIdsSuccess = createAction('LOADED_NODE_IDS_SUCCESS');
export const loadedNodeIdsFailure = createAction('LOADED_NODE_IDS_FAILURE');

import { uniqueId } from '../../_helpers/uniqueId';


export const loadedNodeIdsFetch = ({year}) => {
    return (dispatch) => {
      dispatch(loadedNodeIdsRequest({year}));

      initialDataLoadedService.getNodeIdsByYear(year).then(
        data => {
          dispatch(loadedNodeIdsSuccess({year, nodeIds:data}));
        },
        error => {
          dispatch(loadedNodeIdsFailure({year, ...error}))
        }
      )
    }
}

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

export const dataForNodeUpdate = ({year, moId, moDepartmentId, plannedIndicatorId, value}) => {
    return (dispatch) => {
        const uId = uniqueId('initdata');
        dispatch(dataForNodeUpdateRequest({id:uId, year, moId, moDepartmentId, plannedIndicatorId, value}));
        
        categoryTreeService.setInitDataPlannedIndicator({year, moId, moDepartmentId, plannedIndicatorId, value}).then(
            data => {
                // console.log(data.data.id);
                dispatch(dataForNodeUpdateSuccess({lastId:uId, id:data.data.id, year, moId, moDepartmentId, plannedIndicatorId, value}));
            },
            data => {
                // console.log('error',data);
                dispatch(dataForNodeUpdateFailure({lastId:uId, id:uId, year, moId, moDepartmentId, plannedIndicatorId, value, error:data.error }));
            }
        );
    }
}


/* Reducer */
const initialState = {
  entities: {},
  loaded: {},
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
    case loadedNodeIdsRequest.type:
        return { ...state,
          loaded: { 
            ...state.loaded,
            [action.payload.year]: {
              ...state[action.payload.year],
              loading: true
            }
          }
        };
    case loadedNodeIdsSuccess.type:
        return { ...state,
          loaded: { 
            ...state.loaded,
            [action.payload.year]: {
              ...state[action.payload.year],
              nodeIds: action.payload.nodeIds,
              error: false,
              loading: false
            }
          }
        };
    case loadedNodeIdsFailure.type:
        return { ...state,
          loaded: { 
            ...state.loaded,
            [action.payload.year]: {
              ...state[action.payload.year],
              error: action.error,
              loading: false
            }
          }
        };
    default:
      return state
  }
}

const nodeUpdate = (state, {id, lastId, year, moId, moDepartmentId=null, plannedIndicatorId, value}, status) => {
    const newState = {...state,
        entities: { ...state.entities }
    }
    if (id) {
        newState.entities[id] = {id, year, mo_id:moId, planned_indicator_id:plannedIndicatorId, mo_department_id:moDepartmentId, value, status};
    }
    if (lastId && lastId !== id) {
        delete newState.entities[lastId];
    }
    return newState;
}