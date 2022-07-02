import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + '/users';

export function register(user) {
  // return a Promise
  return http.post(apiEndpoint, {
    // email olarak user.username, registerForm.jsx'te o şekilde kullanıldığı için
    email: user.username,
    password: user.password,
    name: user.name,
  });
}
