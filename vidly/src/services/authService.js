import jwtDecode from 'jwt-decode';

import http from './httpService';
import config from '../config.json';

const apiEndpoint = config.apiUrl + '/auth';
const tokenKey = 'token';

// http modülünün jwt'yi sormasındansa burada auth modülü http modülüne
// jwt'i otomatik olarak geçiyor. Böylece http modülü içinde auth modülü
// import edilmemiş olunuyor.
http.setJwt(getJwt());

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

export function getJwt() {
  return localStorage.getItem(tokenKey);
}

// normalde bunu yazınca yukarıdaki export'lara gerek yok ama başka bir modül içinde
// tek bir fonksiyon import edilmek istenirse diye kaldırmadık. import {login} from ...
// şeklinde yazılırsa fonksiyonlar tek tek import edilebilir.
export default { login, loginWithJwt, logout, getCurrentUser, getJwt };
