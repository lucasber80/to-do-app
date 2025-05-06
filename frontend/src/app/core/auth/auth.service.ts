import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorageService: TokenStorageService
  ) {}
  apiUrl = 'users';

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, {
      email,
      password,
    });
  }

  isAuthenticated() {
    const token = this.tokenStorageService.getToken();
    return !!token;
  }
}
