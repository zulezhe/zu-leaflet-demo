export function setLocalStorage(key, value) {
  window.localStorage.setItem(key, value);
}

export function getLocalStroage(key) {
  return localStorage.getItem(key);
}

export function removeLocalStroage(key) {
  window.localStorage.removeItem(key);
}
