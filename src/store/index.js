import { combineReducers } from 'redux';

//import { authentication } from './authentication.reducer';
import { moReducer } from './mo/moReducer';
import { moDepartmentReducer } from './moDepartment/moDepartmentStore';
import { periodReducer }  from './period/periodStore';
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
import { careProfilesReducer } from './careProfiles/careProfilesStore';
import { vmpGroupsReducer } from './vmpGroups/vmpGroupsStore';
import { vmpTypesReducer } from './vmpTypes/vmpTypesStore';
import { plannedIndicatorChangeReducer } from './plannedIndicatorChange/plannedIndicatorChangeStore';
import { appReducer } from './app/appStore';
//import { alert } from './alert.reducer';

const rootReducer = combineReducers({
  app: appReducer,
  hospitalBedProfiles: hospitalBedProfilesReducer,
  careProfiles: careProfilesReducer,
  medicalServices: medicalServicesReducer,
  medicalAssistanceTypes: medicalAssistanceTypeReducer,
  mo:           moReducer,
  moDepartment: moDepartmentReducer,
  vmpTypes:     vmpTypesReducer,
  vmpGroups:    vmpGroupsReducer,
  period:       periodReducer,
  auth:         authReducer,
  curPage:      curPageReducer,
  indicator:    indicatorReducer,
  plannedIndicator: plannedIndicatorReducer,
  nodeData:     nodeDataReducer,
  initialData:  initialDataReducer,
  plannedIndicatorChange: plannedIndicatorChangeReducer,
  error:        errorReducer,
});

export default rootReducer;