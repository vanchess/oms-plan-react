import { getToken } from './auth-token'

export function authHeader() {
    // return authorization header with jwt token
    let token = getToken();

    if (token) {
        return { 'Authorization': 'Bearer ' + token, 'Accept': 'application/json'};
    } else {
        return {};
    }
}