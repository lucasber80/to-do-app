import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { jwtDecode } from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'users';

  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }

  isAuthenticated(): boolean {
    const token = this.tokenStorageService.getToken();
    if (!token) return false;

    try {
      const { exp } = jwtDecode<{ exp: number }>(token);
      return exp * 1000 > Date.now();
    } catch {
      return false;
    }
  }
}
