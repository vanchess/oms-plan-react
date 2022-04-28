import { apiService } from './apiServiceBase';

export class periodService extends apiService {
    
    static getAll() {
        const path = 'periods';

        return this.get(path).then((data) => {
            return {entities: data.data}
        });
    }
}