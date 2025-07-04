import { apiService } from "./apiServiceBase";

export class customReportProfileRelationTypeService extends apiService {

    static getAll() {
        const path = 'crp-relation-types';

        return this.get(path).then((data) => {
            return {entities: data};
        })
    }
}