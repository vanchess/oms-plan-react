import { apiService } from './apiServiceBase';

export class moDepartmentService extends apiService {

    static getAll(departmentTypes = []) {
        const path = 'medical-institution-department';
        
        return this.get(path, {params: {'departmentTypes':departmentTypes}}).then((data) => {
            return {entities: data.data}
        });
    }
}