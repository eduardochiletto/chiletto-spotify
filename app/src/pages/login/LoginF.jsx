import { message } from 'antd';
import { authenticate, currentUser } from '../../components/auth/auth-provider';
import { API_PATH } from '../../firebase/firebase';


export async function auth(email, password) {
    try {

        return new Promise((resolve, reject) => {
            const url = `${API_PATH}database/user/get/${email}/${password}`;
            fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            }).then((response) => response.json())
                .then((responseData) => {
                    if (responseData.code === 200) {
                        authenticate(responseData.user, responseData.token);
                        resolve(responseData);
                    } else {
                        reject(responseData);
                    }
                })
                .catch(err => {
                    reject(err);
                })
        });

    } catch (error) {
        // Handle Errors here.
        if (error.code === 'auth/user-not-found') {
            message.error('Usuário não encontrado', 2.5);
        }
        if (error.code === 'auth/wrong-password') {
            message.error('Senha inválida');
        }

        if (error.code === 'auth/user-disabled') {
            message.error('Usuário desativado pelo administrador');
        }
        return false;

    }
}

export async function createUser(email, password) {
    try {

        return new Promise((resolve, reject) => {
            const url = `${API_PATH}database/user`;
            const body = JSON.stringify({
                email,
                password
            });


            fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }).then((response) => response.json())
                .then((responseData) => {
                    if (responseData.code === 201) {
                        resolve(responseData);
                    } else {
                        reject(responseData);
                    }
                })
                .catch(err => {
                    reject(false);
                })
        });

    } catch (error) {
        message.error(error.message);
        return false;
    }
}

export async function redefinePassword(email) {
    alert('Not implemented yet');
}

export function redirectJustIfUserIsAuthenticated() {
    const user = currentUser();
    if (user) {
        this.props.history.push('/dashboard');
    }
}