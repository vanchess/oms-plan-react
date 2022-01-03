import { authHeader } from '../../_helpers';
import { apiService } from './axiosApiServiceBase';

import axios from 'axios';

export class authService {
    static logout() {
        return Promise.resolve();
    }
    
    static signUp(user)
    {
        let config = {
          headers: {
            'Content-Type': 'application/json;charset=utf-8'
          }
        }
        
        return axios
          .post(new URL('auth/register', process.env.REACT_APP_APIURL), JSON.stringify(user), config)
          .then(apiService.handleResponse, apiService.handleError);
    }
    
    static login(email, password)
    {
        return axios
          .post(new URL('auth/login', process.env.REACT_APP_APIURL), {
                email: email,
                password: password
            })
          .then(apiService.handleResponse, apiService.handleError);
    }
}