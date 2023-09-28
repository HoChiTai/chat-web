export function saveUserDataStore(data: object) {
  localStorage.setItem('user', JSON.stringify(data));
}

export function getUserDataStore() {
  if (!localStorage.getItem('user')) return '';
  return JSON.parse(localStorage.getItem('user') || JSON.stringify(''));
}

export function removeUserItemDataStore() {
  localStorage.removeItem('user');
}
