import { apiService } from "./apiServiceBase";

export class careProfilesService extends apiService {

    static getAll() {
        const path = 'care-profiles';

        return this.get(path).then((data) => {
            return {entities: data.data};
        })
    }
}