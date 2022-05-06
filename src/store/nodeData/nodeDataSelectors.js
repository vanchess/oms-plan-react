import { ContactSupport } from "@mui/icons-material";
import { createSelector } from "@reduxjs/toolkit";
import { careProfilesSelector } from "../careProfiles/careProfilesSelectors";
import { hospitalBedProfilesSelector } from "../hospitalBedProfiles/hospitalBedProfilesSelectors";
import { indicatorsSelector } from "../indicator/indicatorSelectors";
import { medicalAssistanceTypesSelector } from "../medicalAssistanceType/medicalAssistenceTypeSelectors";
import { medicalServicesSelector } from "../medicalServices/medicalServicesSelectors";

export const selectedNodeIdSelector = (store) => store.nodeData.selectedId;
// export const selectedMoIdSelector = (store) => store.nodeData.selectedMo;
export const selectedYearSelector = (store) => store.nodeData.selectedYear;

/**
 * Данные для узла
 */
export const dataForNodeIdSelector = (store, nodeId) => {
    if (!store.nodeData.entities[nodeId]) {
        return null;
    }
    return store.nodeData.entities[nodeId];
}

/// indicators
export const indicatorIdsForNodeIdSelector = (store, nodeId) => {
    const dataForNodeId = dataForNodeIdSelector(store, nodeId);
    if (!dataForNodeId) {
        return null;
    }
    const indicatorIds = dataForNodeId.indicatorIds;
    if (!indicatorIds) {
        return null;
    }
    return indicatorIds;
}

export const indicatorForNodeIsLoadingSelector = (store, nodeId) => {
    const data = dataForNodeIdSelector(store, nodeId);
    if(!data) {
        return false;
    }
    return data.indicatorIdsLoading;
}

export const indicatorsArrForNodeIdSelector = createSelector(
    [indicatorIdsForNodeIdSelector, indicatorsSelector],
    (indicatorIds, indicators) => {
        if (
            !indicators 
            || !indicatorIds
            || Object.keys(indicators).length === 0
        ) {
            return null;
        }
        return indicatorIds.map(id => { return indicators[id] || {id} });
    }
)

export const indicatorsForSelectedNodeSelector = (store) => {
    return indicatorsArrForNodeIdSelector(store, selectedNodeIdSelector(store));
}
/// hospitalBedProfiles
export const hospitalBedProfilesIdsForNodeIdSelector = (store, nodeId) => {
    const dataForNodeId = dataForNodeIdSelector(store, nodeId);
    if (!dataForNodeId) {
        return null;
    }
    const hospitalBedProfilesIds = dataForNodeId.hospitalBedProfilesIds;
    if (!hospitalBedProfilesIds) {
        return null;
    }
    return hospitalBedProfilesIds;
}

export const hospitalBedProfilesForNodeIsLoadingSelector = (store, nodeId) => {
    const data = dataForNodeIdSelector(store, nodeId);
    if(!data) {
        return false;
    }
    return data.hospitalBedProfilesIdsLoading;
}

export const hospitalBedProfilesArrForNodeIdSelector = createSelector(
    [hospitalBedProfilesIdsForNodeIdSelector,hospitalBedProfilesSelector],
    (hospitalBedProfilesIds, hospitalBedProfiles) => {
        if (
            !hospitalBedProfiles 
            || !hospitalBedProfilesIds
            || Object.keys(hospitalBedProfiles).length === 0
        ) {
            return null;
        }
        return hospitalBedProfilesIds.map(id => { return hospitalBedProfiles[id] });
    }
)

export const hospitalBedProfilesForSelectedNodeSelector = (store) => {
    return hospitalBedProfilesArrForNodeIdSelector(store, selectedNodeIdSelector(store));
}

/// careProfiles
export const careProfilesIdsForNodeIdSelector = (store, nodeId) => {
    const dataForNodeId = dataForNodeIdSelector(store, nodeId);
    if (!dataForNodeId) {
        return null;
    }
    const careProfilesIds = dataForNodeId.careProfilesIds;
    if (!careProfilesIds) {
        return null;
    }
    return careProfilesIds;
}

const careProfilesArrByIds = (careProfiles, ids) => {
    if (
        !careProfiles 
        || !ids
        || Object.keys(careProfiles).length === 0
    ) {
        return null;
    }
    return ids.map(id => { return careProfiles[id] || {id} });
}

export const careProfilesArrByIdsSelector = createSelector(
    [careProfilesSelector, (store, ids) => ids],
    careProfilesArrByIds
)

export const careProfilesForNodeIsLoadingSelector = (store, nodeId) => {
    const data = dataForNodeIdSelector(store, nodeId);
    if(!data) {
        return false;
    }
    return data.careProfilesIdsLoading;
}

export const careProfilesArrForNodeIdSelector = createSelector(
    [careProfilesSelector, careProfilesIdsForNodeIdSelector],
    careProfilesArrByIds
)

export const careProfilesArrForSelectedNodeSelector = (store) => {
    return careProfilesArrForNodeIdSelector(store, selectedNodeIdSelector(store));
}


/// medicalAssistanceTypes
export const medicalAssistanceTypesIdsForNodeIdSelector = (store, nodeId) => {
    const dataForNodeId = dataForNodeIdSelector(store, nodeId);
    if (!dataForNodeId) {
        return null;
    }
    const medicalAssistanceTypesIds = dataForNodeId.medicalAssistanceTypesIds;
    if (!medicalAssistanceTypesIds) {
        return null;
    }
    return medicalAssistanceTypesIds;
}

export const medicalAssistanceTypesForNodeIsLoadingSelector = (store, nodeId) => {
    const data = dataForNodeIdSelector(store, nodeId);
    if(!data) {
        return false;
    }
    return data.medicalAssistanceTypesIdsLoading;
}

export const medicalAssistanceTypesArrForNodeIdSelector = createSelector(
    [medicalAssistanceTypesSelector, medicalAssistanceTypesIdsForNodeIdSelector],
    (medicalAssistanceTypes, medicalAssistanceTypesIds) => {
        if (
            !medicalAssistanceTypes 
            || !medicalAssistanceTypesIds
            || Object.keys(medicalAssistanceTypes).length === 0
        ) {
            return null;
        }
        return medicalAssistanceTypesIds.map(id => medicalAssistanceTypes[id]);
    }
)

export const medicalAssistanceTypesArrForSelectedNodeSelector = (store) => {
    return medicalAssistanceTypesArrForNodeIdSelector(store, selectedNodeIdSelector(store));
}


/// medicalServices
export const medicalServicesIdsForNodeIdSelector = (store, nodeId) => {
    const dataForNodeId = dataForNodeIdSelector(store, nodeId);
    if (!dataForNodeId) {
        return null;
    }
    const medicalServicesIds = dataForNodeId.medicalServicesIds;
    if (!medicalServicesIds) {
        return null;
    }
    return medicalServicesIds;
}

export const medicalServicesForNodeIsLoadingSelector = (store, nodeId) => {
    const data = dataForNodeIdSelector(store, nodeId);
    if(!data) {
        return false;
    }
    return data.medicalServicesIdsLoading;
}

export const medicalServicesArrForNodeIdSelector = createSelector(
    [medicalServicesSelector, medicalServicesIdsForNodeIdSelector],
    (medicalServices, medicalServicesIds) => {
        if (!medicalServices || !medicalServicesIds || Object.keys(medicalServices).length === 0) {
            return null;
        }
        return medicalServicesIds.map(id => medicalServices[id]);
    }
)

export const medicalServicesArrForSelectedNodeSelector = (store) => {
    return medicalServicesArrForNodeIdSelector(store, selectedNodeIdSelector(store));
}