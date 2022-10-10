import { apiService } from "./apiServiceBase";

export class commissionDecisionService extends apiService{
    static async getByYear(year) {
        const path = 'commission-decision';

        const data = await this.get(path, { params: { year } });
        return { entities: data.data };
    }

    static async add({number, date, description}) {
        const path = 'commission-decision';
        const data = await this.post(path, {number, date, description}, {headers: {'Content-Type': 'application/json;charset=utf-8'}});
        return data;
    }
}