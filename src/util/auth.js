import Cookies from 'js-cookie';

const TokenKey = 'Moafly-Token';
const userData = 'Moafly-user';
const hoseId = 'Moafly-hoseId';

export function getCookie(key) {
  return Cookies.get(key);
}

export function setCookie(key, value) {
  return Cookies.set(key, value);
}

export function removeCookie(key) {
  return Cookies.remove(key);
}

export function getToken() {
  return Cookies.get(TokenKey);
}

export function setToken(token) {
  return Cookies.set(TokenKey, token);
}

export function removeToken() {
  return Cookies.remove(TokenKey);
}
export function getuserData() {
  return sessionStorage.getItem(userData);
}

export function setuserData(data) {
  const checkedIdStr = JSON.stringify(data);
  return sessionStorage.setItem(userData, checkedIdStr);
}

export function removeuserData() {
  return sessionStorage.removeItem(userData);
}
export function gethoseId() {
  return sessionStorage.getItem(hoseId);
}

export function sethoseId(data) {
  const checkedIdStr = JSON.stringify(data);
  return sessionStorage.setItem(hoseId, checkedIdStr);
}

export function removehoseId() {
  return sessionStorage.removeItem(hoseId);
}
