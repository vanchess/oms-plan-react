import { apiService } from "./apiServiceBase";

export class customReportUnitsService extends apiService {

    static getAll() {
        const path = 'custom-report-units';

        return this.get(path).then((data) => {
            return {entities: data};
        })
    }
}