import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (token) {
      try {
        return decode(token);
      } catch (error) {
        console.error('Invalid token:', error);
        return {}; // Return an empty object if the token is invalid
      }
    }
    return {}; // Return an empty object if no token
  }

  loggedIn() {
    const token = this.getToken();
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    const decoded = decode(token);
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();
