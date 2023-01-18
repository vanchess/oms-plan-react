import { apiService } from './apiServiceBase';

export class initialDataLoadedService extends apiService {

    static getNodeIdsByYear(year) {
        const path = 'init-data-loaded-nodes';
        
        return this.get(path, {params: {'year':year}}).then((data) => {
            return data;
        });
    }

    static async commitDataByNodes(year, nodes) {
        const path = 'init-data-loaded-nodes';

        const data = await this.post(path, { year, nodes });
        return data;
    }
}