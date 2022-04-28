import { apiService } from './apiServiceBase';

export class hospitalBedProfilesService extends apiService {

    static getAll() {
        const path = 'hospital-bed-profiles';
        
        return this.get(path).then((data) => {
            return {entities: data.data};
        });
    }
}