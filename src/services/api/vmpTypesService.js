import { apiService } from "./apiServiceBase";

export class vmpTypesService extends apiService {
    
    static getAll() {
        const path = 'vmp-types';

        return this.get(path).then(data => {
            return {entities: data.data};
        });
    }
}