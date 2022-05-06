import { apiService } from './apiServiceBase';

export class plannedIndicatorChangeService extends apiService {
    static getByNodeIdAndYear(nodeId, year) {
        const path = 'planned-indicator-change';
        
        return this.get(path, {params: {'node':nodeId, 'year':year}}).then((data) => {
            return {entities: data.data.reduce((arr, item) => {arr[item.id] = item; return arr;}, [])}
        });
    }
    
    static set({periodId, moId, moDepartmentId, plannedIndicatorId, value}) {
        const path = 'planned-indicator-change';
        
        return this.post(path, {periodId, moId, moDepartmentId, plannedIndicatorId, value}, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((data) => {
            return data;
        });
    }
}