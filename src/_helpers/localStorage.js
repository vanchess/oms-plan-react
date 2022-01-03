export class Storage {
    static getItem(name) {
        try {
            const serializedData =  localStorage.getItem(name);
            if (serializedData === null) {
                return undefined;
            }
            return JSON.parse(serializedData);
        } catch(err) {
            return undefined;
        }
    }

    static setItem(name, serializedData) {
        try {
            const data = JSON.stringify(serializedData);
            localStorage.setItem(name, data);
        } catch(err) {
            
        }
    }
    
    static removeItem(name) {
        try {
            localStorage.removeItem(name);
            if (localStorage.getItem(name) === null) {
                return true;
            }
            return false;
        } catch(err) {
            return false;
        }
    }
}