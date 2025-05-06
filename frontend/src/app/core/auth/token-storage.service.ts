import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
export const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor(private router: Router) {}

  public signOut(): void {
    this.router.navigate(['/login']);
    localStorage.clear();
  }

  public saveToken(token: any): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, JSON.stringify(token));
  }

  public getToken(): any {
    let token = localStorage.getItem(TOKEN_KEY);
    if (token) return JSON.parse(token);
    return null;
  }

  public saveUser(user: any): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);

    return user ? JSON.parse(user) : null;
  }

  public exist(key: string): boolean {
    return !(
      localStorage.getItem(key) === null || localStorage.getItem(key) === ''
    );
  }
}
