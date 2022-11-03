import { createAction } from '@reduxjs/toolkit'

export const appInitBegin = createAction('APP_INIT_BEGIN');
export const planCorrectionSetPeriodValue = createAction('PLAN_CORRECTION_INPUT_SET_PERIOD_VALUE');
export const planCorrectionSetTotalValue  = createAction('PLAN_CORRECTION_INPUT_SET_TOTAL_VALUE');

/* Reducer */
const initialState = {
    appInitBegin: false,
    planCorrection: {
      periodValueInput: {},
      totalValueInput: '0'
    }
};
  
export function appReducer(state = initialState, action) {
    switch (action.type) {
      case appInitBegin.type:
        return { ...state,
            appInitBegin: true
        };
      case planCorrectionSetPeriodValue.type:
        return { ...state,
          planCorrection: { ...state.planCorrection,
            periodValueInput: action.payload
          }
        };
      case planCorrectionSetTotalValue.type:
        return { ...state,
          planCorrection: { ...state.planCorrection,
            totalValueInput: action.payload
          }
        };
      default:
        return state;
    }
}