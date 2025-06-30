import { apiService } from "./apiServiceBase";

export class customReportService extends apiService {

    static getAll() {
        const path = 'custom-reports';

        return this.get(path).then((data) => {
            return {entities: data};
        })
    }

    static create(data) {
        const path = 'custom-reports';

        return this.post(path, data, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((data) => {
            return {entity: data};
        })
    }

    static update(id, data) {
        const path = `custom-reports/${id}`;

        return this.put(path, data, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((data) => {
            return {entity: data};
        })
    }

    static remove(id) {
        const path = `custom-reports/${id}`;

        return this.delete(path).then((data) => {
            return {entity: data};
        })
    }

}