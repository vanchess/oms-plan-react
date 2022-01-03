import { apiService } from './apiServiceBase';

export class indicatorService extends apiService {

    static getAll() {
        const path = 'indicators';
        
        return this.get(path).then((data) => {
            return {entities: data.data}
        });
    }
}