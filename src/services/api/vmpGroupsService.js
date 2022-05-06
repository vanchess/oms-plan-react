import { apiService } from "./apiServiceBase";

export class vmpGroupsService extends apiService {
    static getAll() {
        const path = 'vmp-groups'

        return this.get(path).then(data => {
            return {entities: data.data};
        })
    }
}