import { apiService } from './apiServiceBase';

export class categoryTreeService extends apiService {
/*
    static getAll() {
        const path = 'hospital-bed-profiles';
        
        return this.get(path).then((data) => {
            console.log(data);
            return {entities: data.data.reduce((arr, item) => {arr[item.id] = item; return arr;}, [])}
        });
    }
*/

    static getIndicatorsUsedForNodeId(nodeId) {
        const path = 'used-indicators';
        
        return this.get(path, {params: {'node':nodeId}}).then((data) => {
            return data;
        });
    }
    
    static getHospitalBedProfilesUsedForNodeId(nodeId) {
        const path = 'used-hospital-bed-profiles';
        
        return this.get(path, {params: {'node':nodeId}}).then((data) => {
            return data;
        });
    }

    static getCareProfilesUsedForNodeId(nodeId) {
        const path = 'used-care-profiles';

        return this.get(path, {params: {'node':nodeId}}).then((data) => {
            return data;
        });
    }
    
    static getMedicalAssistanceTypesUsedForNodeId(nodeId) {
        const path = 'used-medical-assistance-types';
        
        return this.get(path, {params: {'node':nodeId}}).then((data) => {
            return data;
        });
    }
    
    static getMedicalServicesUsedForNodeId(nodeId) {
        const path = 'used-medical-services';
        
        return this.get(path, {params: {'node':nodeId}}).then((data) => {
            return data;
        });
    }
    
    
    static getInitDataForNodeId(nodeId, year) {
        const path = 'node-init-data';
        
        return this.get(path, {params: {'node':nodeId, 'year':year}}).then((data) => {
            return {entities: data.data.reduce((arr, item) => {arr[item.id] = item; return arr;}, [])}
        });
    }
    
    static setInitDataPlannedIndicator({year, moId, moDepartmentId, plannedIndicatorId, value}) {
        const path = 'node-init-data';
        
        return this.post(path, {year, moId, moDepartmentId, plannedIndicatorId, value}, {headers: {'Content-Type': 'application/json;charset=utf-8'}}).then((data) => {
            return data;
        });
    }

    static getTree(rootNodeId) {
        const path = 'category-tree';
        
        return this.get(path + '/' + rootNodeId).then((data) => {
            return data;
        });
    }

    static getTreeNodes() {
        const path = 'category-tree-nodes';

        return this.get(path).then((data) => {
            return {entities: data.data}
        });
    }

    
}