import Cookie from 'js-cookie';

export function setCookies(user) {
  const userArr = Object.entries(user);
  for (let i = 0; i < userArr.length; i += 1) {
    Cookie.set(userArr[i][0], userArr[i][1]);
  }
  return true;
}
export function getCookies() {
  return {
    username: Cookie.get('username'),
    appkey: Cookie.get('appkey'),
    role: Cookie.get('role'),
    email: Cookie.get('email'),
  };
}

export function removeCookies() {
  Cookie.remove('username');
  Cookie.remove('appkey');
  Cookie.remove('role');
  Cookie.remove('email');
  return true;
}
export function clearCookies() {
  Cookie.clear();
}
