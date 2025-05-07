import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'users';
  constructor(private http: HttpClient) {}

  createUser(user: User): Observable<User> {
    return this.http.post<any>(`${this.apiUrl}/register`, user);
  }
}
