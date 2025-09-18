import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ITodo } from './to-do-model';

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private api = 'http://localhost:3000/todos';

  constructor(private http: HttpClient) { }

  getAll(): Observable<ITodo[]> {
    return this.http.get<ITodo[]>(this.api)
  }

  addToDo(task: string): Observable<ITodo> {
    return this.http.post<ITodo>(this.api, { task });
  }

  updateToDo(id: number, updates: any): Observable<ITodo> {
    return this.http.put<ITodo>(`${this.api}/${id}`, updates);
  }

  deleteToDo(id: number): Observable<any> {
    return this.http.delete(`${this.api}/${id}`);
  }
}
