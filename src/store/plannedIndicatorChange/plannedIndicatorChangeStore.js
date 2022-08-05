import { createAction } from '@reduxjs/toolkit'
import { plannedIndicatorChangeService } from '../../services';

export const indicatorChangeForNodeIdGetRequest = createAction('PLANNED_INDICATOR_CHANGE_NODE_GET_REQUEST');
export const indicatorChangeForNodeIdGetSuccess = createAction('PLANNED_INDICATOR_CHANGE_NODE_GET_SUCCESS');
export const indicatorChangeForNodeIdGetFailure = createAction('PLANNED_INDICATOR_CHANGE_NODE_GET_FAILURE');

export const indicatorChangeForNodeAddRequest = createAction('PLANNED_INDICATOR_CHANGE_NODE_SET_REQUEST');
export const indicatorChangeForNodeAddSuccess = createAction('PLANNED_INDICATOR_CHANGE_NODE_SET_SUCCESS');
export const indicatorChangeForNodeAddFailure = createAction('PLANNED_INDICATOR_CHANGE_NODE_SET_FAILURE');

import { uniqueId } from '../../_helpers/uniqueId';

export const indicatorChangeForNodeIdFetch = ({nodeId, year}) => {
  return (dispatch) => {
    // console.log(nodeId);
    dispatch(indicatorChangeForNodeIdGetRequest());

    plannedIndicatorChangeService.getByNodeIdAndYear(nodeId, year).then(
        data => {
            dispatch(indicatorChangeForNodeIdGetSuccess({nodeId, entities: data.entities}));
        },
        error => {
            dispatch(indicatorChangeForNodeIdGetFailure(error));
        }
      );
  }
}

export const indicatorChangeForNodeAdd = ({periodId, moId, moDepartmentId, plannedIndicatorId, value, oldValue}) => {
    return (dispatch) => {
        const uId = uniqueId('change');
        dispatch(indicatorChangeForNodeAddRequest({id:uId, periodId, moId, moDepartmentId, plannedIndicatorId, value:(value-oldValue)}));
        
        plannedIndicatorChangeService.set({periodId, moId, moDepartmentId, plannedIndicatorId, value}).then(
            data => {
                // console.log(data.data.id);
                dispatch(indicatorChangeForNodeAddSuccess({lastId:uId, id:data.data.id, periodId, moId, moDepartmentId, plannedIndicatorId, value:data.data.value, commitId:data.commit_id}));
            },
            data => {
                // console.log('error',data);
                dispatch(indicatorChangeForNodeAddFailure({lastId:uId, id:uId, periodId, moId, moDepartmentId, plannedIndicatorId, value:0, error:data.error }));
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


export function plannedIndicatorChangeReducer(state = initialState, action) {
  switch (action.type) {
    case indicatorChangeForNodeIdGetRequest.type:
      return { ...state,
        loading: true
      };
    case indicatorChangeForNodeIdGetSuccess.type:  
      return { ...state,
        entities: { //...state.entities,
            ...action.payload.entities,
        },
        loading: false
      };
    case indicatorChangeForNodeIdGetFailure.type:
      return { ...state,
        error: action.error,
        loading: false
      };
    case indicatorChangeForNodeAddRequest.type:
        return nodeUpdate(state, action.payload, 'saving');
    case indicatorChangeForNodeAddSuccess.type:
        return nodeUpdate(state, action.payload, 'saved');
    case indicatorChangeForNodeAddFailure.type:
        return nodeUpdate(state, action.payload, 'error');
    default:
      return state
  }
}

const nodeUpdate = (state, {id, lastId, periodId, moId, moDepartmentId=null, plannedIndicatorId, value, commitId=null}, status) => {
    const newState = {...state,
        entities: { ...state.entities }
    }
    if (id) {
        newState.entities[id] = {id, period_id:periodId, mo_id:moId, planned_indicator_id:plannedIndicatorId, mo_department_id:moDepartmentId, value, status, commit_id:commitId};
    }
    if (lastId && lastId !== id) {
        delete newState.entities[lastId];
    }
    return newState;
}