import { apiService } from './apiServiceBase';

export class plannedIndicatorService extends apiService {

    static async getByYear(year) {
        const path = 'planned-indicators';

        const data = await this.get(path, { params: { year } });
        return { entities: data.data };
    }
}