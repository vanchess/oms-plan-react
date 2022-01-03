import { combineReducers } from 'redux';

//import { authentication } from './authentication.reducer';
import { moReducer } from './mo/moReducer';
import { moDepartmentReducer } from './moDepartment/moDepartmentStore';
import { periodReducer }  from './period/periodReducer';
import { authReducer }    from './auth/authReducer';
import { curPageReducer } from './curPage/curPageStore';
import { hospitalBedProfilesReducer } from './hospitalBedProfiles/hospitalBedProfilesStore';
import { medicalServicesReducer } from './medicalServices/medicalServicesStore';
import { medicalAssistanceTypeReducer } from './medicalAssistanceType/medicalAssistanceTypeStore';
import { indicatorReducer } from './indicator/indicatorStore';
import { plannedIndicatorReducer } from './plannedIndicator/plannedIndicatorStore';
import { nodeDataReducer } from './nodeData/nodeDataStore';
import { initialDataReducer } from './initialData/initialDataStore';
import { errorReducer } from './error/errorStore';
//import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  hospitalBedProfiles: hospitalBedProfilesReducer,
  medicalServices: medicalServicesReducer,
  medicalAssistanceTypes: medicalAssistanceTypeReducer,
  mo:           moReducer,
  moDepartment: moDepartmentReducer,
  period:       periodReducer,
  auth:         authReducer,
  curPage:      curPageReducer,
  indicator:    indicatorReducer,
  plannedIndicator: plannedIndicatorReducer,
  nodeData:     nodeDataReducer,
  initialData:  initialDataReducer,
  error:        errorReducer
});

export default rootReducer;