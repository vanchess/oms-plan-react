export const vmpGroupsSelector = store => store.vmpGroups.entities;
export const vmpGroupsIdsSelector = store => store.vmpGroups.ids;

export const vmpGroupsSelectorIsLoadingSelector = store => store.vmpGroups.loading;

export const vmpGroupByIdSelector = (store, id) => {
    return vmpGroupsSelector(store)[id];
}