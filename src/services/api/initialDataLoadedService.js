import { apiService } from './apiServiceBase';

export class initialDataLoadedService extends apiService {

    static getNodeIdsByYear(year) {
        const path = 'init-data-loaded-nodes';
        
        return this.get(path, {params: {'year':year}}).then((data) => {
            return data;
        });
    }
}