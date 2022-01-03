import { PERIOD_GET_REQUEST, PERIOD_GET_SUCCESS, PERIOD_GET_FAILURE } from '../../constants/periodConstants.js'

const initialState = {
  entities: {},
  ids: [],
  loading: false,
  error: false,
};

export function periodReducer(state = initialState, action) {
  switch (action.type) {
    case PERIOD_GET_REQUEST:
      return { ...state,
        loading: true
      };
    case PERIOD_GET_SUCCESS:  
      return { ...state,
        entities: action.payload.entities.reduce((o, item) => {o[item.id] = item; return o;}, {}),
        ids: action.payload.entities.map(e => e.id),
        loading: false
      };
    case PERIOD_GET_FAILURE:
      return { ...state,
        error: action.error,
        loading: false
      };
    default:
      return state
  }
}