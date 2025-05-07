import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private apiUrl = 'tasks';

  constructor(private http: HttpClient) {}

  createTask(task: Task): Observable<Task> {
    return this.http.post<any>(this.apiUrl, task);
  }

  editTask(task: Task, taskId: number): Observable<Task> {
    return this.http.patch<any>(`${this.apiUrl}/${taskId}`, task);
  }

  listPendingTasks() {
    return this.http.get<any>(this.apiUrl);
  }

  completeTask(taskId: number): Observable<Task> {
    return this.http.patch<any>(`${this.apiUrl}/${taskId}/complete`, {});
  }
}
