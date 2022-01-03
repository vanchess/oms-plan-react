import { apiService } from './apiServiceBase';

export class medicalAssistanceTypeService extends apiService {

    static getAll() {
        const path = 'medical-assistance-types';
        
        return this.get(path).then((data) => {
            return {entities: data.data}
        });
    }
}