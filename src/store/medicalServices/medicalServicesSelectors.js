export const medicalServicesSelector = (store) => {
    return store.medicalServices.entities;
}

export const medicalServicesIdsSelector = (store) => {
    return store.medicalServices.ids;
}

export const medicalServicesIsLoadingSelector = (store) => {
    return store.medicalServices.loading;
}

export const medicalServiceByIdSelector = (store, id) => {
    return medicalServicesSelector(store)[id];
}