import { createSelector } from 'reselect';

export const initialDataSelector = (store) => {
    return store.initialData.entities;
}

export const initialDataIsLoadingSelector = (store) => {
    return store.initialData.loading;
}

export const sortedInitialDataArraySelector = createSelector(
    [initialDataSelector],
    (items) => {      
        return Object.values(items).sort((a, b) => {

            if (a.status === 'saving' || b.status === 'saving') {
                if (a.status !== 'saving') {
                    return 1
                }
                if (b.status !== 'saving') {
                    return -1
                }
            }

            return (b.id-a.id)
            
        })
    }
);

export const distinctInitialDataArraySelector = createSelector(
    [sortedInitialDataArraySelector],
    (array) => {
        return array.filter(item => {
            const firstItem = array.find(i => {
                return item.mo_id===i.mo_id 
                    && item.planned_indicator_id===i.planned_indicator_id 
                    && item.year===i.year
                    && item.mo_department_id===i.mo_department_id;
            });
            return item.id === firstItem.id;
        })
    }
);

export const initialDataItemSelector = (store, {moId, year, plannedIndicatorId, moDepartmentId = null}) => {
    const dataArray = distinctInitialDataArraySelector(store);
    
    if(dataArray.length === 0) {
        return null;
    }
    
    return dataArray.find(item => {
        return item.mo_id===moId 
            && item.planned_indicator_id===plannedIndicatorId 
            && item.year===year
            && item.mo_department_id===moDepartmentId;
    });
}


export const valueSelector = (store, {moId, year, plannedIndicatorId, moDepartmentId}) => {
    const item = initialDataItemSelector(store, {moId, year, plannedIndicatorId, moDepartmentId});
    
    if(!item) {
        return null;
    }
    
    return item.value;
}

export const statusSelector = (store, {moId, year, plannedIndicatorId, moDepartmentId}) => {
    const item = initialDataItemSelector(store, {moId, year, plannedIndicatorId, moDepartmentId});

    if(!item) {
        return null;
    }
    
    return item.status;
}

export const totalValueSelector = (store, {plannedIndicatorIds, year, moIds, moDepartmentIds=null}) => {
    const dataArray = distinctInitialDataArraySelector(store);
    if(dataArray.length === 0) {
        return null;
    }
    
    let total = 0;
    if(moIds && plannedIndicatorIds) {
        let items = dataArray.filter(item => {
            let departmentNotUse = true;
            if(moDepartmentIds) {
                departmentNotUse = false;
            } 

            return item.year===year
                && moIds.includes(item.mo_id)
                && (departmentNotUse || moDepartmentIds.includes(item.mo_department_id))
                && plannedIndicatorIds.includes(item.planned_indicator_id);
        });
        if (items) {
            total = items.reduce((total,item) => {
                return total + Number(item.value);
            }, total);
        }
    }
    
    return total;
}    