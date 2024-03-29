export const hospitalBedProfilesSelector = (store) => {
    return store.hospitalBedProfiles.entities;
}

export const hospitalBedProfilesIdsSelector = (store) => {
    return store.hospitalBedProfiles.ids;
}

export const hospitalBedProfilesIsLoadingSelector = (store) => {
    return store.hospitalBedProfiles.loading;
}

export const hospitalBedProfilesById = (store, id) => {
    return hospitalBedProfilesSelector(store)[id];
}