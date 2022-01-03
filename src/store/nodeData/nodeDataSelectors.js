export const selectedNodeIdSelector = (store) => store.nodeData.selectedId;

export const indicatorsForNodeIdSelector = (store, nodeId) => {
    const indicators = store.indicator.entities;
    if (!store.nodeData.entities[nodeId]) {
        return [];
    }
    const indicatorIds = store.nodeData.entities[nodeId].indicatorIds;
    if (!indicatorIds) {
        return [];
    }
    return indicatorIds.map(id => indicators[id]);
}
//store.nodeData.selectedId

export const indicatorsForSelectedNodeSelector = (store) => {
    return indicatorsForNodeIdSelector(store, selectedNodeIdSelector(store));
}

export const hospitalBedProfilesForNodeIdSelector = (store, nodeId) => {
    const hospitalBedProfiles = store.hospitalBedProfiles.entities;
    if (!store.nodeData.entities[nodeId]) {
        return [];
    }
    const hospitalBedProfilesIds = store.nodeData.entities[nodeId].hospitalBedProfilesIds;
    if (!hospitalBedProfilesIds) {
        return [];
    }
    return hospitalBedProfilesIds.map(id => hospitalBedProfiles[id]);
}
//store.nodeData.selectedId

export const hospitalBedProfilesForSelectedNodeSelector = (store) => {
    return hospitalBedProfilesForNodeIdSelector(store, selectedNodeIdSelector(store));
}


export const medicalAssistanceTypesForNodeIdSelector = (store, nodeId) => {
    const medicalAssistanceTypes = store.medicalAssistanceTypes.entities;
    if (!store.nodeData.entities[nodeId]) {
        return [];
    }
    const medicalAssistanceTypesIds = store.nodeData.entities[nodeId].medicalAssistanceTypesIds;
    if (!medicalAssistanceTypesIds) {
        return [];
    }
    return medicalAssistanceTypesIds.map(id => medicalAssistanceTypes[id]);
}
//store.nodeData.selectedId

export const medicalAssistanceTypesForSelectedNodeSelector = (store) => {
    return medicalAssistanceTypesForNodeIdSelector(store, selectedNodeIdSelector(store));
}


export const medicalServicesForNodeIdSelector = (store, nodeId) => {
    const medicalServices = store.medicalServices.entities;
    if (!store.nodeData.entities[nodeId]) {
        return [];
    }
    const medicalServicesIds = store.nodeData.entities[nodeId].medicalServicesIds;
    if (!medicalServicesIds) {
        return [];
    }
    return medicalServicesIds.map(id => medicalServices[id]);
}
//store.nodeData.selectedId

export const medicalServicesForSelectedNodeSelector = (store) => {
    return medicalServicesForNodeIdSelector(store, selectedNodeIdSelector(store));
}