import jwtDecode from 'jwt-decode';

import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + '/auth';
const tokenKey = 'token';

export async function login(email, password) {
  // json web token'ı alıyoruz
  const { data: jwt } = await http.post(apiEndpoint, { email, password });

  // browser local storage'e json web token kaydedildi
  localStorage.setItem(tokenKey, jwt);
}

export function loginWithJwt(jwt) {
  localStorage.setItem(tokenKey, jwt);
}

export function logout() {
  localStorage.removeItem(tokenKey);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(tokenKey);
    return jwtDecode(jwt);
  } catch (ex) {
    return null;
  }
}

// normalde bunu yazınca yukarıdaki export'lara gerek yok ama başka bir modül içinde
// tek bir fonksiyon import edilmek istenirse diye kaldırmadık. import {login} from ...
// şeklinde yazılırsa fonksiyonlar tek tek import edilebilir.
export default { login, loginWithJwt, logout, getCurrentUser };
