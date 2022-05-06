export const medicalAssistanceTypesSelector = (store) => {
    return store.medicalAssistanceTypes.entities;
}

export const medicalAssistanceTypesIsLoadingSelector = (store) => {
    return store.medicalAssistanceTypes.loading;
}

export const medicalAssistanceTypeByIdSelector = (store, id) => {
    return medicalAssistanceTypesSelector(store)[id];
}