import { createSelector } from "@reduxjs/toolkit";

export const plannedIndicatorsSelector = (store) => {
    return store.plannedIndicator.entities;
}

export const plannedIndicatorByIdSelector = (store, id) => {
    return plannedIndicatorsSelector(store)[id];
}

export const plannedIndicatorsIsLoadingSelector = (store) => {
    return store.plannedIndicator.loading;
}

const plannedIndicatorsArrByIds = (plannedIndicators, ids) => {
    return ids.map(id => { return plannedIndicators[id] || {id:id} });
}

export const plannedIndicatorsArrByIdsSelector = createSelector(
    [plannedIndicatorsSelector, (store, ids) => ids],
    plannedIndicatorsArrByIds
)

export const getPlannedIndicator = (plannedIndicators, {nodeId, indicatorId, profileId=null, assistanceTypeId=null, serviceId=null, careProfileId=null, vmpGroupId=null, vmpTypeId=null}) => {
    const e = plannedIndicators;
    if(Object.keys(e).length === 0) {
        return null;
    }
    
    const plannedIndicatorId = Object.keys(e).find(id => {
        return (
            e[id].node_id === nodeId 
            && e[id].indicator_id === indicatorId 
            && e[id].profile_id === profileId 
            && e[id].assistance_type_id === assistanceTypeId
            && e[id].service_id === serviceId
            && e[id].care_profile_id === careProfileId
            && e[id].vmp_group_id === vmpGroupId
            && e[id].vmp_type_id === vmpTypeId
        );
    });
    
    if(!plannedIndicatorId) {
        return null;
    }
    
    return Number(plannedIndicatorId);
}

export const plannedIndicatorIdSelector = (store, params) => {
    const e = plannedIndicatorsSelector(store);

    return getPlannedIndicator(e, params);
}

export const plannedIndicatorIdsSelector = (store, params) => {
    if (!params.nodeId || !params.indicatorId) {
        return null;
    }
    const p = plannedIndicatorIdsWhereSelector(store, params);
    if (p.length === 0) {
        return null;
    }
    return p;
}

const plannedIndicatorFilter = (plannedIndicators, {nodeId, indicatorId, profileId, assistanceTypeId, serviceId, careProfileId, vmpGroupId, vmpTypeId}) => {
    const e = plannedIndicators;
    const plannedIndicatorIds = Object.keys(e).filter(id => {

        if (nodeId !== undefined && e[id].node_id !== nodeId) {
            return false;
        }
        if (indicatorId !== undefined && e[id].indicator_id !== indicatorId) {
            return false;
        }
        if (profileId !== undefined && e[id].profile_id !== profileId) {
            return false;
        }
        if (assistanceTypeId !== undefined && e[id].assistance_type_id !== assistanceTypeId) {
            return false;
        }
        if (serviceId !== undefined && e[id].service_id !== serviceId) {
            return false;
        }
        if (careProfileId !== undefined && e[id].care_profile_id !== careProfileId) {
            return false;
        }
        if (vmpGroupId !== undefined && e[id].vmp_group_id !== vmpGroupId) {
            return false;
        }
        if (vmpTypeId !== undefined && e[id].vmp_type_id !== vmpTypeId) {
            return false;
        }
        return true;
    });
    
    return plannedIndicatorIds.map(id => Number(id));
}

export const plannedIndicatorIdsWhereSelector = (store, params = {}) => {
    const e = plannedIndicatorsSelector(store);
    return plannedIndicatorFilter(e, params);
}

const checkEqualityPlannedIndicatorWhereObject = createSelector(
    [
        (store, obj = {}) => obj.nodeId,
        (store, obj = {}) => obj.indicatorId,
        (store, obj = {}) => obj.profileId,
        (store, obj = {}) => obj.assistanceTypeId,
        (store, obj = {}) => obj.serviceId,
        (store, obj = {}) => obj.careProfileId,
        (store, obj = {}) => obj.vmpGroupId,
        (store, obj = {}) => obj.vmpTypeId,
    ],
    (nodeId, indicatorId, profileId, assistanceTypeId, serviceId, careProfileId, vmpGroupId, vmpTypeId) => {
        return {nodeId, indicatorId, profileId, assistanceTypeId, serviceId, careProfileId, vmpGroupId, vmpTypeId};
    }
)
export const plannedIndicatorsWhereSelector = createSelector(
    [plannedIndicatorsSelector, checkEqualityPlannedIndicatorWhereObject],
    (plannedIndicators, params) => {
        const ids = plannedIndicatorFilter(plannedIndicators, params);
        return plannedIndicatorsArrByIds(plannedIndicators, ids);
    }
)

export const plannedIndicatorsIdsByNodeIdsSelector = (store, nodeIds) => {
    const e = plannedIndicatorsSelector(store);
    const plannedIndicatorIds = Object.keys(e).filter(id => {
        if (nodeIds.includes(e[id].node_id)) {
            return true;
        }
        return false;
    });
    return plannedIndicatorIds.map(id => Number(id));
}