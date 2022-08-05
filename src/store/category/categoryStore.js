import { createAction } from '@reduxjs/toolkit'
import { CategoryService } from '../../services/api/categoryService'

export const categoryGetRequest = createAction('CATEGORY_GET_REQUEST');
export const categoryGetSuccess = createAction('CATEGORY_GET_SUCCESS');
export const categoryGetFailure = createAction('CATEGORY_GET_FAILURE');

export const categoryFetch = () => {
    return (dispatch) => {
        dispatch(categoryGetRequest());

        CategoryService.getAll().then(
            dataCollection => dispatch(categoryGetSuccess(dataCollection)),
            error => dispatch(categoryGetFailure(error))
        )
    }
}

/* Reducer */
const initialState = {
    entities: {},
    ids: [],
    loading: false,
    error: false,
}

export function categoryReducer(state = initialState, action) {
    switch (action.type) {
        case categoryGetRequest.type:
            return { ...state,
                loading: true,
            }
        case categoryGetSuccess.type:
            return { ...state,
                entities: action.payload.entities.reduce((o, item) => {o[item.id] = item; return o;}, {}),
                ids: action.payload.entities.map(item => item.id),
                loading: false,
                error: false,
            }
        case categoryGetFailure.type:
            return { ...state,
                error: action.error,
                loading: false,
            }
        default:
            return state;
    }
}