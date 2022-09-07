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

export const moDepartmentsArrByMoIdFilter = (departmentsArr, moId) => {
        if (!departmentsArr) {
            return null;
        }
        return departmentsArr.filter(d => d.mo_id === moId);
}

export const moDepartmentsArrByMoIdSelector = createSelector(
    [moDepartmentsArrSelector, (store, moId) => moId],
    moDepartmentsArrByMoIdFilter
)

const EmptyArray = [];
export const moDepartmentsIdsByMoIdSelector = (store, moId) => {
    const departmentsArr = moDepartmentsArrByMoIdSelector(store, moId);
    if (!departmentsArr) {
        return EmptyArray;
    }
    return departmentsArr.map(d => d.id);
}

/*
export const moDepartmentsArrForSelectedMoSelector = (store) => {
    return moDepartmentsArrByMoIdSelector(store, selectedMoIdSelector(store));
}
*/