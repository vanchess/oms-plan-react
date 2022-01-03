import { apiService } from './apiServiceBase';

export class medicalServicesService extends apiService {

    static getAll() {
        const path = 'medical-services';
        
        return this.get(path).then((data) => {
            return {entities: data.data}
        });
    }
}