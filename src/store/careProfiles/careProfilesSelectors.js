export const careProfilesSelector = (store) => {
    return store.careProfiles.entities;
}

export const careProfilesIdsSelector = (store) => {
    return store.careProfiles.ids;
}

export const careProfileIsLoadingSelector = (store) => {
    return store.careProfiles.loading;
}

export const careProfileById = (store, id) => {
    return careProfilesSelector(store)[id];
}