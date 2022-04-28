import { createSelector } from '@reduxjs/toolkit';

export const moDepartmentsIdsSelector = store => store.moDepartment.ids;

export const moDepartmentsSelector = store => store.moDepartment.entities;

export const moDepartmentsArrSelector = createSelector(
    [moDepartmentsIdsSelector, moDepartmentsSelector],
    (ids, moDepartments) => {
        if (!moDepartments || !ids || Object.keys(moDepartments).length === 0) {
            return null;
        }
        return ids.map(id => moDepartments[id]);
    }
)

export const moDepartmentsArrByMoIdSelector = createSelector(
    [moDepartmentsArrSelector, (store, moId) => moId],
    (departments, moId) => {
        if (!departments) {
            return null;
        }
        return departments.filter(d => d.mo_id === moId);
    }
)

/*
export const moDepartmentsArrForSelectedMoSelector = (store) => {
    return moDepartmentsArrByMoIdSelector(store, selectedMoIdSelector(store));
}
*/