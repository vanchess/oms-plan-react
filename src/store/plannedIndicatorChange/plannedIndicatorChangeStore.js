import { createAction } from '@reduxjs/toolkit'
import { plannedIndicatorChangeService } from '../../services';

export const indicatorChangeForNodeIdsGetRequest = createAction('PLANNED_INDICATOR_CHANGE_NODE_GET_REQUEST');
export const indicatorChangeForNodeIdsGetSuccess = createAction('PLANNED_INDICATOR_CHANGE_NODE_GET_SUCCESS');
export const indicatorChangeForNodeIdsGetFailure = createAction('PLANNED_INDICATOR_CHANGE_NODE_GET_FAILURE');

export const indicatorChangeForNodeAddRequest = createAction('PLANNED_INDICATOR_CHANGE_NODE_SET_REQUEST');
export const indicatorChangeForNodeAddSuccess = createAction('PLANNED_INDICATOR_CHANGE_NODE_SET_SUCCESS');
export const indicatorChangeForNodeAddFailure = createAction('PLANNED_INDICATOR_CHANGE_NODE_SET_FAILURE');

export const indicatorChangeIncrementValuesRequest = createAction('PLANNED_INDICATOR_CHANGE_INCREMENT_VALUES_REQUEST');
export const indicatorChangeDeleteValues = createAction('PLANNED_INDICATOR_CHANGE_DELETE_VALUES');
export const indicatorChangeIncrementValuesSuccess = createAction('PLANNED_INDICATOR_CHANGE_INCREMENT_VALUES_SUCCESS');
export const indicatorChangeIncrementValuesFailure = createAction('PLANNED_INDICATOR_CHANGE_INCREMENT_VALUES_FAILURE');

import { uniqueId } from '../../_helpers/uniqueId';

export const indicatorChangeForNodeIdFetch = ({nodeId, year}) => {
    return indicatorChangeForNodeIdsFetch({nodeIds:[nodeId], year});
}

let controller = new AbortController();
export const indicatorChangeForNodeIdsFetch = ({nodeIds, year}) => {
  return (dispatch) => {
    // console.log(nodeId);
    controller.abort();
    controller = new AbortController();

    dispatch(indicatorChangeForNodeIdsGetRequest());
    plannedIndicatorChangeService.getByNodeIdsAndYear(nodeIds, year, controller.signal).then(
        data => {
          dispatch(indicatorChangeForNodeIdsGetSuccess({nodeIds, entities: data.entities}));
        },
        error => {
            dispatch(indicatorChangeForNodeIdsGetFailure(error));
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

export const indicatorChangeIncrementValues = ({values, total}) => {
  return (dispatch) => {
      const valuesWithTempId = values.map(v => {
        return {...v, id:uniqueId('change')}
      })

      dispatch(indicatorChangeIncrementValuesRequest({data: valuesWithTempId}));
      
      plannedIndicatorChangeService.incrementValues({values, total}).then(
          data => {
            console.log(data);
            dispatch(indicatorChangeDeleteValues({data: valuesWithTempId}));
            dispatch(indicatorChangeIncrementValuesSuccess(data));
          },
          data => {
              //const valuesWithTempIdError = valuesWithTempId.map(v => {
              //  return {...v, error:data.error}
              //})

            // console.log('error',data);
              dispatch(indicatorChangeIncrementValuesFailure({data: valuesWithTempId, error:data.error}));
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
    case indicatorChangeForNodeIdsGetRequest.type:
      return { ...state,
        loading: true
      };
    case indicatorChangeForNodeIdsGetSuccess.type:  
      return { ...state,
        entities: { //...state.entities,
            ...action.payload.entities,
        },
        loading: false
      };
    case indicatorChangeForNodeIdsGetFailure.type:
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
    case indicatorChangeIncrementValuesRequest.type:
        return addValues(state, action.payload.data, 'saving');
    case indicatorChangeDeleteValues.type:
      const newState = {...state,
          entities: { ...state.entities }
      }
      action.payload.data.forEach(element => {
        delete newState.entities[element.id];
      });
      return newState;
    case indicatorChangeIncrementValuesSuccess.type:
      return addValues(state, action.payload.data, 'saved');
    case indicatorChangeIncrementValuesFailure.type:
      return addValues(state, action.payload.data, 'error');
    default:
      return state;
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

const addValues = (state, valueArray, status) => {
  console.log('valueArray', valueArray);
  return {
    ...state,
    entities: { ...state.entities,
      ...valueArray.reduce((prev, cur) => {
        prev[cur.id]={ 
          id:cur.id, 
          period_id:cur.periodId ?? cur.period_id, 
          mo_id:cur.moId ?? cur.mo_id, 
          planned_indicator_id:cur.plannedIndicatorId ?? cur.planned_indicator_id, 
          mo_department_id:cur.moDepartmentId ?? cur.mo_department_id ?? null, 
          value:cur.value, 
          status: status, 
          commit_id:cur.commitId ?? cur.commit_id ?? null
        };
        return prev;
      }, {})
    },
  };
}