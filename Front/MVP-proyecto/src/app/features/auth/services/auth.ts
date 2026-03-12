import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private validUsers = ['admin', 'user'];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  isValidUser(username: string): boolean {
    return this.validUsers.includes(username.toLowerCase());
  }

  login(username: string): boolean {
    if (!this.isValidUser(username)) {
      return false;
    }

    if (isPlatformBrowser(this.platformId)) {
      const role = username.toLowerCase() === 'admin' ? 'admin' : 'user';
      localStorage.setItem('role', role);
      localStorage.setItem('username', username.toLowerCase());
    }
    return true;
  }

  getRole() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role');
    }
    return null;
  }

  getUsername() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('username');
    }
    return null;
  }

  isAdmin() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role') === 'admin';
    }
    return false;
  }

  isAuthenticated() {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('role') !== null;
    }
    return false;
  }

  logout() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('role');
      localStorage.removeItem('username');
    }
  }
}
