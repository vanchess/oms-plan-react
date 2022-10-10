import { apiService } from "./apiServiceBase";

export class changePackageService extends apiService{
    static async getAll(signal) {
        const path = 'change-package';

        const data = await this.get(path, { signal });
        return { entities: data.data };
    }
}