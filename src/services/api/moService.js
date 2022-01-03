import { apiService } from './apiServiceBase';

export class moService extends apiService {
    
    static getAll() {
        const path = 'medical-institution';

        return this.get(path).then((data) => {
            return {entities: data.data}
        });
    }
    
    static getIdsHavingDepartments(departmentTypes) {
        const path = 'medical-institution-ids/having-departments';

        return this.get(path, {params: {'departmentTypes':departmentTypes}}).then((data) => {
            return data;
        });
    }
}