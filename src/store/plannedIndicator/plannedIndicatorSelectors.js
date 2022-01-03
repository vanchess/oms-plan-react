export const plannedIndicatorIdSelector = (store, {nodeId, indicatorId, profileId=null, assistanceTypeId=null, serviceId=null}) => {
    const e = store.plannedIndicator.entities;

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
        );
    });
    
    if(!plannedIndicatorId) {
        return null;
    }
    
    return Number(plannedIndicatorId);
}

export const plannedIndicatorIdsSelector = (store, {nodeId, indicatorId, profileId, assistanceTypeId, serviceId}) => {
    const e = store.plannedIndicator.entities;

    if(Object.keys(e).length === 0) {
        return null;
    }
    
    const plannedIndicatorIds = Object.keys(e).filter(id => {
        let result = e[id].node_id === nodeId && e[id].indicator_id === indicatorId;
        if (profileId !== undefined) {
            result = result && e[id].profile_id===profileId;
        }
        if (assistanceTypeId !== undefined) {
            result = result && e[id].assistance_type_id===assistanceTypeId
        }
        if (serviceId !== undefined) {
            result = result && e[id].service_id===serviceId
        }
        return result;
    });
    
    if(!plannedIndicatorIds) {
        return null;
    }
    
    return plannedIndicatorIds.map(id => Number(id));
}