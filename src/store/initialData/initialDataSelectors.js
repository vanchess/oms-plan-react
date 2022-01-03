import { createSelector } from 'reselect';

export const initialDataSelector = (store) => {
    return store.initialData.entities;
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
/*
export const distinctInitialDataArraySelector = createSelector(
    [sortedInitialDataArray],
    (array) => {
        return 
    }
);
*/
export const initialDataItemSelector = (store, {moId, year, plannedIndicatorId}) => {
    const dataArray = sortedInitialDataArraySelector(store);
    
    if(dataArray.length === 0) {
        return null;
    }
    
    return dataArray.find(item => {
        return item.mo_id===moId 
            && item.planned_indicator_id===plannedIndicatorId 
            && item.year===year;
    });
}


export const valueSelector = (store, {moId, year, plannedIndicatorId}) => {
    const item = initialDataItemSelector(store, {moId, year, plannedIndicatorId});
    
    if(!item) {
        return null;
    }
    
    return item.value;
}

export const statusSelector = (store, {moId, year, plannedIndicatorId}) => {
    const item = initialDataItemSelector(store, {moId, year, plannedIndicatorId});

    if(!item) {
        return null;
    }
    
    return item.status;
}

export const totalValueSelector = (store, {plannedIndicatorIds, year, moIds}) => {
    const dataArray = sortedInitialDataArraySelector(store);
    
    if(dataArray.length === 0) {
        return null;
    }
    
    let total = 0;
    if(moIds && plannedIndicatorIds) {
        moIds.forEach( (moId) => {
            plannedIndicatorIds.forEach( (plannedIndicatorId) => {
                let item = dataArray.find(item => {
                    return item.mo_id===moId 
                        && item.planned_indicator_id===plannedIndicatorId 
                        && item.year===year;
                });
                if (item)
                total = total + Number(item.value);
            });
        });
    }
    
    return total;
}    