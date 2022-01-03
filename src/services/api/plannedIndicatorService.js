import { apiService } from './apiServiceBase';

export class plannedIndicatorService extends apiService {

    static getAll() {
        const path = 'planned-indicators';
        
        return this.get(path).then((data) => {
            return {entities: data.data.reduce((arr, item) => {arr[item.id] = item; return arr;}, [])}
        });
    }
}