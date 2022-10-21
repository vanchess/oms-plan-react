import { createSelector } from '@reduxjs/toolkit';
import { DateTime } from '../../_helpers/dateTime';
import { Interval } from '../../_helpers/dateTimeInterval';

export const periodsSelector = store => store.period.entities;

export const periodIsLoadingSelector = store => store.period.loading;

export const periodIdsByYearSelector = createSelector(
    [periodsSelector, (store, year) => year],
    (periods, year) => {
        const from = DateTime.local(year, 1, 1, 0, 0, 0, 0);
        const to = DateTime.local(year, 12, 31, 23, 59, 59, 999);
        return periodIdsBetween(periods, from, to);
    }
)

const EmptyArray = [];
export const periodIdsBetweenSelector = (store, from, to) => {
    if (!from || !to) {
        return EmptyArray;
    }
    const periods = periodsSelector(store);
    return periodIdsBetween(periods, from, to);
}


const periodIdsBetween = (periods, from, to) => {
    const interval = Interval.fromDateTimes(from, to);
    
    const result = Object.keys(periods).filter( (id) => {
        const pFrom = DateTime.fromISO(periods[id].from);
        const pTo = DateTime.fromISO(periods[id].to);
        return interval.contains(pFrom) 
            && interval.contains(pTo);
    })
    return result.map(id => Number(id));
}