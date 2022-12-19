import { createSelector } from 'reselect';

export const moSelector = (store) => {
    return store.mo.entities;
}

export const moIsLoadingSelector = (store) => {
    return store.mo.loading;
}

export const moByIdSelector = (store, id) => {
    return moSelector(store)[id];
}

export const moIdsSelector = (store) => {
    return store.mo.ids;
}

export const moArrSelector = createSelector(
    [moIdsSelector, moSelector],
    (ids, items) => ids.map(id => items[id])
)

export const moHavingDepartmentsSelector = (store) => {
    return store.mo.idsHavingDepartments.map(id => store.mo.entities[id]).filter(item => item !== undefined);
}