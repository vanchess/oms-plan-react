import { createSelector } from "@reduxjs/toolkit";

export const changePackageSelector = store => store.changePackage.entities;
export const changePackageIsdSelector = store => store.changePackage.ids;
export const changePackageArrSelector = store => {
    const ids = changePackageIsdSelector(store);
    const entities = changePackageSelector(store);

    return ids.map(id => entities[id]);
}

export const changePackageIdsByCommissionDecisionIdSelector = createSelector(
    [changePackageIsdSelector, changePackageSelector, (store, commissionId) => commissionId],
    (ids, entities, commissionId) => {
        return ids.filter(id => {return (entities[id].commission_decision_id === commissionId)});
    }
)

export const changePackageIdsByLastCommissionDecisionIdSelector = createSelector(
    [changePackageIsdSelector, changePackageSelector, (store, commissionId) => commissionId],
    (ids, entities, commissionId) => {
        return ids.filter(id => {return (entities[id].commission_decision_id <= commissionId)});
    }
)

export const changePackageIdByEditableCommissionDecisionIdSelector = (store, commissionId) => {
    const ids = changePackageIsdSelector(store);
    const entities = changePackageSelector(store);

    return ids.find(id => {return (entities[id].commission_decision_id === commissionId)});
}