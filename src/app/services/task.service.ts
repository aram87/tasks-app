import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { environment } from 'src/environments/environment';
import TaskResponse from '../responses/task-response';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private httpClient: HttpClient) { }

  getTasks(): Observable<TaskResponse[]> {
    return this.httpClient.get<TaskResponse[]>(`${environment.apiUrl}/tasks`);
  }

  saveTask(task: TaskResponse): Observable<TaskResponse> {
    return this.httpClient.post<TaskResponse>(`${environment.apiUrl}/tasks`, task);
  }

  updateTask(task: TaskResponse): Observable<TaskResponse> {
    return this.httpClient.put<TaskResponse>(`${environment.apiUrl}/tasks`, task);
  }

  deleteTask(taskId: number) {
    return this.httpClient.delete<TaskResponse>(`${environment.apiUrl}/tasks/${taskId}`);
  }
  
}