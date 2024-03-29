import { createSelector } from 'reselect';

export const plannedIndicatorChangeSelector = (store) => {
    return store.plannedIndicatorChange.entities;
}

export const sortedPlannedIndicatorChangeArraySelector = createSelector(
    [plannedIndicatorChangeSelector],
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

            if (a.status === 'error' || b.status === 'error') {
                if (a.status !== 'error') {
                    return 1
                }
                if (b.status !== 'error') {
                    return -1
                }
            }

            return (b.id-a.id)
            
        })
    }
);

export const plannedIndicatorChangeItemsSelector = (store, {moId, periodId, plannedIndicatorId, moDepartmentId = null}) => {
    const dataArray = sortedPlannedIndicatorChangeArraySelector(store);
    
    if(dataArray.length === 0) {
        return null;
    }
    
    return dataArray.filter(item => {
        return item.mo_id===moId 
            && item.planned_indicator_id===plannedIndicatorId 
            && item.period_id===periodId
            && item.mo_department_id===moDepartmentId;
    });
}


export const valueSelector = (store, {moId, periodId, plannedIndicatorId, moDepartmentId}) => {
    const items = plannedIndicatorChangeItemsSelector(store, {moId, periodId, plannedIndicatorId, moDepartmentId});
    
    if(!items || items.length === 0) {
        return null;
    }
    
    return items.reduce((sum, item) => { return (sum + Number(item.value))}, 0);
}

export const statusSelector = (store, {moId, periodId, plannedIndicatorId, moDepartmentId}) => {
    const items = plannedIndicatorChangeItemsSelector(store, {moId, periodId, plannedIndicatorId, moDepartmentId});

    if(!items || items.length === 0) {
        return null;
    }
    //console.log(items);
    return items[0].status;
}

export function getAlgorithmIdByIndicatorId(indicatorId) {
    if (indicatorId === 1 || indicatorId === 10) {
        return 1;
    }
    return 2;
}

function createSumPeriodsFunction(algorithmId) {
    if (algorithmId === 1) {
        return (total, value, periodId) => {
            if(!total[periodId]) {
                total[periodId] = 0;
            }
            total[periodId] = total[periodId] + Number(value);
            return total;
        }
    }
    return (total, value, periodId) => {
        total[0] = total[0] + Number(value);
        return total;
    }
}

export function getTotal(sumPeriods, algorithmId, periodId=null) {
    if (algorithmId === 1) {
        if(periodId) {
            return sumPeriods[periodId];
        }
    }
    return sumPeriods.at(-1);
}

/**
 * 
 * @param {*} dataArray 
 * @param {*} optionsObj 
 * @returns 
 * 
 * indicatorId НЕ используестся для фильтрации
 * indicatorId используется для выбора алгоритма сложения показателей
 */
export const totalValue = (dataArray, {plannedIndicatorIds, periodIds, moIds, indicatorId, moDepartmentIds=null, maxPackageId=null, onlyPackageIds=null}) => {
    if(dataArray.length === 0) {
        return null;
    }
    let sumPeriods = null;
    const algorithmId = getAlgorithmIdByIndicatorId(indicatorId);
    if(moIds && plannedIndicatorIds && periodIds) {
        const sumPeriodsFunction = createSumPeriodsFunction(algorithmId);
        let departmentNotUse = true;
        let onlyPackageIdsNotUse = false;
        let maxPackageIdNotUse = false;
        if(moDepartmentIds) {
            departmentNotUse = false;
        }
        if(onlyPackageIds === null){
            onlyPackageIdsNotUse = true;
        }
        if(!onlyPackageIdsNotUse || maxPackageId === null){
            maxPackageIdNotUse = true;
        }
        let items = dataArray.filter(item => {
            return periodIds.includes(item.period_id)
                && moIds.includes(item.mo_id)
                && (departmentNotUse || moDepartmentIds.includes(item.mo_department_id))
                && (onlyPackageIdsNotUse || onlyPackageIds.includes(item.package_id))
                && (maxPackageIdNotUse || (item.package_id <= maxPackageId))
                && plannedIndicatorIds.includes(item.planned_indicator_id);
        });
        if (items.length > 0) {
            sumPeriods = items.reduce((total,item) => {
                return sumPeriodsFunction(total, item.value, item.period_id);
            }, [0]);
        }
    }
    if (sumPeriods === null) {
        return null;
    }
    return getTotal(sumPeriods, algorithmId);
}

export const totalValueSelector = (store, filterOptionsObj) => {
    const dataArray = sortedPlannedIndicatorChangeArraySelector(store);
    return totalValue(dataArray, filterOptionsObj);
}

export const createPeriodTotalValueSelector = (periodIds = []) => {
    const selectors = periodIds.map((periodId) => {
        return (store, filterOptionsObj) => totalValueSelector(store, {...filterOptionsObj, periodIds:[periodId]});
    });

    return createSelector(selectors, (...args) => {
        console.log(args);
        return periodIds.reduce((prev, cur, i) => { prev[cur] = args[i] ?? 0; return prev }, {});
    });
}

export const plannedIndicatorChangeItemsIsLoadingSelector = (store) => {
    return store.plannedIndicatorChange.loading;
}

const EmptyArray = [];
const checkEqualityPlannedIndicatorChangeByPackageIdsObject = createSelector(
    [
        (store, obj = {}) => obj.plannedIndicatorIds,
        (store, obj = {}) => obj.periodIds,
        (store, obj = {}) => obj.packageIds,
    ],
    (plannedIndicatorIds, periodIds, packageIds) => {
        return {plannedIndicatorIds, periodIds, packageIds};
    }
)
export const plannedIndicatorChangeByPackageIdsSelector = createSelector(
    [sortedPlannedIndicatorChangeArraySelector, checkEqualityPlannedIndicatorChangeByPackageIdsObject],
    (dataArray, {plannedIndicatorIds, periodIds, packageIds=[null]}) => {
        if(dataArray.length === 0) {
            return EmptyArray;
        }
        let items = EmptyArray;
        if(plannedIndicatorIds && periodIds) {
            items = dataArray.filter(item => {
                return  packageIds.includes(item.package_id)
                    && periodIds.includes(item.period_id)
                    && plannedIndicatorIds.includes(item.planned_indicator_id);
            });
        }
        
        return items;
    }
)

export const plannedIndicatorChangeByPackageIdSelector = (store, {plannedIndicatorIds, periodIds, packageId=null}) => {
    return plannedIndicatorChangeByPackageIdsSelector(store, {plannedIndicatorIds, periodIds, packageIds:[packageId]});
}

export const plannedIndicatorChangeByPackageIdHaveStatusSelector = (store, {plannedIndicatorIds, periodIds, packageId=null}, status) => {
    const dataArray = sortedPlannedIndicatorChangeArraySelector(store);
    if(dataArray.length === 0) {
        return false;
    }
    if(plannedIndicatorIds && periodIds) {
        for (let index = 0; index < dataArray.length; index++) {
            const item = dataArray[index];
            if(packageId === item.package_id
                && periodIds.includes(item.period_id)
                && plannedIndicatorIds.includes(item.planned_indicator_id)
                && item.status === status
            ) {
                return true;
            }
        }
    }
    
    return false;
}