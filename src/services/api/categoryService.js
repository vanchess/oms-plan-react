import { apiService } from "./apiServiceBase";

export class CategoryService extends apiService{
    static getAll() {
        const path = 'categories'

        return this.get(path).then(data => {
            return {entities: data.data}
        });
    }
}