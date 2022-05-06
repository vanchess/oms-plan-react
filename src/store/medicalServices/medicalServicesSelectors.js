export const medicalServicesSelector = (store) => {
    return store.medicalServices.entities;
}

export const medicalServicesIsLoadingSelector = (store) => {
    return store.medicalServices.loading;
}

export const medicalServiceByIdSelector = (store, id) => {
    return medicalServicesSelector(store)[id];
}