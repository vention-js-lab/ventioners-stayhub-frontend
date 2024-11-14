const ACCESS_TOKEN_KEY = 'accessToken';

export class AccessTokenStore {
  static getToken() {
    return localStorage.getItem(ACCESS_TOKEN_KEY);
  }

  static setToken(token: string) {
    localStorage.setItem(ACCESS_TOKEN_KEY, token);
  }

  static removeToken() {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
  }
}
