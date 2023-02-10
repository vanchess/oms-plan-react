import { AUTH_USER_LOGIN_SUCCESS, AUTH_USER_LOGOUT_SUCCESS } from '../constants/authConstants.js'
import { selectedYearSelector } from '../store/nodeData/nodeDataSelectors.js';
import { yearSelected } from '../store/nodeData/nodeDataStore.js';
import { commissionDecisionIdSelected } from '../store/commissionDecision/CommissionDecisionStore.js'; 
import { selectedCommissionDecisionIdSelector } from '../store/commissionDecision/CommissionDecisionSelector.js';

export function createPersistentStorageMiddleware(storage) {
    return ({ getState }) => next => action => {
        const result = next(action);
        switch (result.type) {
            case AUTH_USER_LOGIN_SUCCESS:  
              storage.setItem('auth', getState().auth);
              break;
            case AUTH_USER_LOGOUT_SUCCESS:  
              storage.removeItem('auth');
              break;
            case yearSelected.type:
              storage.setItem('selectedYear', selectedYearSelector(getState()));
              storage.setItem('commissionDecisionSelectedId', selectedCommissionDecisionIdSelector(getState()));
              break;
            case commissionDecisionIdSelected.type:
              storage.setItem('commissionDecisionSelectedId', selectedCommissionDecisionIdSelector(getState()));
              break;
        }
        return result;
    }
}