import { authHeader } from '../../_helpers';

export class apiService {
    
    static baseUrl = `${process.env.REACT_APP_APIURL}`;
    
    static createHeaders(headers){
        return {...authHeader(), ...headers};
    }
    
    static handleResponse(response) {
        if (response) {
            return Promise.resolve(response);
        } else {
            const error = response.statusText || "Ошибка!";
                
            return Promise.reject(error);
        }
    }
    
    static handleError(error) {
        let err = {
            data: null,
            status: null,
            statusText: null
        };
        
        if (error.response)
        {
            if(error.response.data) {
                err.data = error.response.data;
            }
            err.status = error.response.status;
            err.statusText = error.response.statusText;
        }
        
        //console.log(error.response.data);
        //console.log(error.response.status);
        //console.log(error.response.headers);
        
        return Promise.reject(err);
    }

}