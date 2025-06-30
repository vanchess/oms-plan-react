import { apiService } from './apiServiceBase';

export class customReportProfileService extends apiService {
    
    static getByReportId(reportId) {
        const path = `custom-reports/${reportId}/profiles`;
        return this.get(path).then((data) => {
            return { entities: data };
        });
    }

    static create(data) {
        const path = 'custom-report-profiles';
        return this.post(path, data, {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).then((data) => {
            return { entity: data };
        });
    }

    static update(id, data) {
        const path = `custom-report-profiles/${id}`;
        return this.put(path, data, {
            headers: { 'Content-Type': 'application/json;charset=utf-8' }
        }).then((data) => {
            return { entity: data };
        });
    }

    static remove(id) {
        const path = `custom-report-profiles/${id}`;
        return this.delete(path).then((data) => {
            return { entity: data };
        });
    }
}