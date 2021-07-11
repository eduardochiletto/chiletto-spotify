import ls from 'local-storage';
import { API_PATH } from '../../firebase/firebase';
const TOKEN_USER = 'chilettoUser';
const TOKEN_STORAGE = 'chilettoToken';

export function authenticate(user, token) {
    ls.set(TOKEN_STORAGE, token);
    ls.set(TOKEN_USER, user);    
}

export function logout() {
    ls.set(TOKEN_STORAGE, null);
    ls.set(TOKEN_USER, null);
}

export function currentToken() {
    return ls.get(TOKEN_STORAGE);
}

export function setCurrentUser(user) {
    return ls.set(TOKEN_USER, user);
}

export function currentUser() {
    return ls.get(TOKEN_USER);
}

export function isLoggedIn() {
    const user = currentUser();
    return user !== null && user !== undefined;
}

export function validateToken() {
    return new Promise((resolve, reject) => {
        const token = currentToken();        
        const url = `${API_PATH}token/validate`;
        fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': token
            },
        }).then((response) => response.json())
            .then((responseData) => {
                if (responseData.code === 200) {
                    resolve(responseData);
                } else {
                    logout();
                    reject(responseData);
                }
            })
            .catch(err => {
                reject(err);
            })
    });


}
