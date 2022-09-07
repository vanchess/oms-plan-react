import { apiService } from './apiServiceBase';

export class plannedIndicatorChangeService extends apiService {
    static getByNodeIdAndYear(nodeId, year) {
        return this.getByNodeIdsAndYear([nodeId], year)
    }

    static getByNodeIdsAndYear(nodeIds, year, signal) {
        const path = 'planned-indicator-change';
        
        return this.get(path, {params: {'nodes':nodeIds, 'year':year}, signal}).then((data) => {
            return {entities: data.data.reduce((arr, item) => {arr[item.id] = item; return arr;}, [])}
        });
    }
    
    static set({periodId, moId, moDepartmentId, plannedIndicatorId, value}) {
        const path = 'planned-indicator-change';
        
        return this.post(path, {periodId, moId, moDepartmentId, plannedIndicatorId, value}, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((data) => {
            return data;
        });
    }

    static incrementValues(incrementValuesObject) {
        const path = 'planned-indicator-change-add-values';
        
        return this.post(path, incrementValuesObject, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((data) => {
            return data;
        });
    }

}