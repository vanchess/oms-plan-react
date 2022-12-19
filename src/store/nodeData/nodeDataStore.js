import { createAction } from '@reduxjs/toolkit'
import { categoryTreeService } from '../../services';

export const indicatorsUsedForNodeIdGetRequest = createAction('INDICATORS_USED_NODE_GET_REQUEST');
export const indicatorsUsedForNodeIdGetSuccess = createAction('INDICATORS_USED_NODE_GET_SUCCESS');
export const indicatorsUsedForNodeIdGetFailure = createAction('INDICATORS_USED_NODE_GET_FAILURE');

export const hospitalBedProfilesUsedForNodeIdGetRequest = createAction('HOSPITAL_BED_PROFILES_USED_NODE_GET_REQUEST');
export const hospitalBedProfilesUsedForNodeIdGetSuccess = createAction('HOSPITAL_BED_PROFILES_USED_NODE_GET_SUCCESS');
export const hospitalBedProfilesUsedForNodeIdGetFailure = createAction('HOSPITAL_BED_PROFILES_USED_NODE_GET_FAILURE');

export const careProfilesUsedForNodeIdGetRequest = createAction('CARE_PROFILES_USED_NODE_GET_REQUEST');
export const careProfilesUsedForNodeIdGetSuccess = createAction('CARE_PROFILES_USED_NODE_GET_SUCCESS');
export const careProfilesUsedForNodeIdGetFailure = createAction('CARE_PROFILES_USED_NODE_GET_FAILURE');

export const medicalAssistanceTypesUsedForNodeIdGetRequest = createAction('MEDICAL_ASSISTANCE_TYPES_USED_NODE_GET_REQUEST');
export const medicalAssistanceTypesUsedForNodeIdGetSuccess = createAction('MEDICAL_ASSISTANCE_TYPES_USED_NODE_GET_SUCCESS');
export const medicalAssistanceTypesUsedForNodeIdGetFailure = createAction('MEDICAL_ASSISTANCE_TYPES_USED_NODE_GET_FAILURE');

export const medicalServicesUsedForNodeIdGetRequest = createAction('MEDICAL_SERVICES_USED_NODE_GET_REQUEST');
export const medicalServicesUsedForNodeIdGetSuccess = createAction('MEDICAL_SERVICES_USED_NODE_GET_SUCCESS');
export const medicalServicesUsedForNodeIdGetFailure = createAction('MEDICAL_SERVICES_USED_NODE_GET_FAILURE');

export const nodeIdSelected = createAction('NODE_ID_SELECTED');
export const yearSelected = createAction('YEAR_SELECTED');
export const currentlyUsedDateSelected = createAction('CURRENTLY_USED_DATE_SELECTED');
// export const moSelected = createAction('MO_SELECTED');
// export const moNotSelected = createAction('MO_NOT_SELECTED');

export const indicatorsUsedForNodeIdFetch = ({nodeId}) => {
  return (dispatch) => {
    dispatch(indicatorsUsedForNodeIdGetRequest({nodeId}));
    
    categoryTreeService.getIndicatorsUsedForNodeId(nodeId).then(
        value => dispatch(indicatorsUsedForNodeIdGetSuccess({nodeId, value})),
        error => {
            dispatch(indicatorsUsedForNodeIdGetFailure({nodeId, ...error}));
        }
      );
  }
}

export const hospitalBedProfilesUsedForNodeIdFetch = ({nodeId}) => {
  return (dispatch) => {
    dispatch(hospitalBedProfilesUsedForNodeIdGetRequest({nodeId}));
    
    categoryTreeService.getHospitalBedProfilesUsedForNodeId(nodeId).then(
        value => dispatch(hospitalBedProfilesUsedForNodeIdGetSuccess({nodeId, value})),
        error => {
            dispatch(hospitalBedProfilesUsedForNodeIdGetFailure({nodeId, ...error}));
        }
      );
  }
}

export const careProfilesUsedForNodeIdFetch = ({nodeId}) => {
  return (dispatch) => {
    dispatch(careProfilesUsedForNodeIdGetRequest({nodeId}));
    
    categoryTreeService.getCareProfilesUsedForNodeId(nodeId).then(
        value => dispatch(careProfilesUsedForNodeIdGetSuccess({nodeId, value})),
        error => {
            dispatch(careProfilesUsedForNodeIdGetFailure({nodeId, ...error}));
        }
      );
  }
}

export const medicalAssistanceTypesUsedForNodeIdFetch = ({nodeId}) => {
  return (dispatch) => {
    dispatch(medicalAssistanceTypesUsedForNodeIdGetRequest({nodeId}));
    
    categoryTreeService.getMedicalAssistanceTypesUsedForNodeId(nodeId).then(
        value => dispatch(medicalAssistanceTypesUsedForNodeIdGetSuccess({nodeId, value})),
        error => {
            dispatch(medicalAssistanceTypesUsedForNodeIdGetFailure({nodeId, ...error}));
        }
      );
  }
}

export const medicalServicesUsedForNodeIdFetch = ({nodeId}) => {
  return (dispatch) => {
    dispatch(medicalServicesUsedForNodeIdGetRequest({nodeId}));
    
    categoryTreeService.getMedicalServicesUsedForNodeId(nodeId).then(
        value => dispatch(medicalServicesUsedForNodeIdGetSuccess({nodeId, value})),
        error => {
            dispatch(medicalServicesUsedForNodeIdGetFailure({nodeId, ...error}));
        }
      );
  }
}

export const createInitialState = ({selectedYear}) => {
  return {
    ...initialState,
    selectedYear: selectedYear ?? new Date().getFullYear(),
    currentlyUsedDate: selectedYear ? (selectedYear+"-01-01") : (new Date().getFullYear() +"-01-01"),
  }
}

/* Reducer */
const initialState = {
  entities: {},
  selectedId: null,
  selectedMo: null,
  //loading: false,
  //error: false,
};

export function nodeDataReducer(state = initialState, action) {
  switch (action.type) {
    case indicatorsUsedForNodeIdGetRequest.type:  
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                indicatorIdsLoading: true
            }
        }
      };
    case indicatorsUsedForNodeIdGetSuccess.type:
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                indicatorIds: action.payload.value,
                error: false,
                indicatorIdsLoading: false
            }
        }
      };
    case indicatorsUsedForNodeIdGetFailure.type:
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                error: action.payload.error,
                indicatorIdsLoading: false
            }
        }
      };
    case hospitalBedProfilesUsedForNodeIdGetRequest.type:  
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                hospitalBedProfilesIdsLoading: true
            }
        }
      };
    case hospitalBedProfilesUsedForNodeIdGetSuccess.type:
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                hospitalBedProfilesIds: action.payload.value,
                error: false,
                hospitalBedProfilesIdsLoading: false
            }
        }
      };
    case hospitalBedProfilesUsedForNodeIdGetFailure.type:
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                error: action.payload.error,
                hospitalBedProfilesIdsLoading: false
            }
        }
      };
    case careProfilesUsedForNodeIdGetRequest.type:  
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                careProfilesIdsLoading: true
            }
        }
      };
    case careProfilesUsedForNodeIdGetSuccess.type:
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                careProfilesIds: action.payload.value,
                error: false,
                careProfilesIdsLoading: false
            }
        }
      };
    case careProfilesUsedForNodeIdGetFailure.type:
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                error: action.payload.error,
                careProfilesIdsLoading: false
            }
        }
      };
    case medicalAssistanceTypesUsedForNodeIdGetRequest.type:  
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                medicalAssistanceTypesIdsLoading: true
            }
        }
      };
    case medicalAssistanceTypesUsedForNodeIdGetSuccess.type:
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                medicalAssistanceTypesIds: action.payload.value,
                error: false,
                medicalAssistanceTypesIdsLoading: false
            }
        }
      };
    case medicalAssistanceTypesUsedForNodeIdGetFailure.type:
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                error: action.payload.error,
                medicalAssistanceTypesIdsLoading: false
            }
        }
      };
     
    case medicalServicesUsedForNodeIdGetRequest.type:  
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                medicalServicesIdsLoading: true
            }
        }
      };
    case medicalServicesUsedForNodeIdGetSuccess.type:
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                medicalServicesIds: action.payload.value,
                error: false,
                medicalServicesIdsLoading: false
            }
        }
      };
    case medicalServicesUsedForNodeIdGetFailure.type:
      return { ...state,
        entities: { ...state.entities,
            [action.payload.nodeId]: { ...state.entities[action.payload.nodeId],
                error: action.payload.error,
                medicalServicesIdsLoading: false
            }
        }
      };  
      
      
    case yearSelected.type:
        return { ...state,
            selectedYear: action.payload.year
        }
    case currentlyUsedDateSelected.type:
        return { ...state,
          currentlyUsedDate: action.payload.currentlyUsedDate
        }
        /*
    case moSelected.type:
        return { ...state,
            selectedMo: Number(action.payload.moId)
        }
        
    case moNotSelected.type:
        return { ...state,
            selectedMo: null
        }*/
    case nodeIdSelected.type:
        return { ...state,
            selectedId: Number(action.payload.nodeId)
        }
    default:
      return state
  }
}
