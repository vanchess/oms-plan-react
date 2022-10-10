export const selectedCommissionDecisionIdSelector = store => store.commissionDecision.selectedId;
export const editableCommissionDecisionIdSelector = store => store.commissionDecision.editableId;
export const commissionDecisionSelector = store => store.commissionDecision.entities;
export const commissionDecisionByIdSelector = (store, id) => commissionDecisionSelector(store)[id];

export const commissionDecisionArrSelector = store => {
    const cd = commissionDecisionSelector(store);
    return store.commissionDecision.ids.map(id => cd[id]);
}