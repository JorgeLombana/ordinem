import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Todo } from '@interfaces/todo.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private _http: HttpClient = inject(HttpClient);

  constructor() {}

  public getTodos(): Observable<Todo[]> {
    return this._http.get<Todo[]>(environment.API);
  }

  public createTodo(todo: Todo): Observable<Todo> {
    return this._http.post<Todo>(environment.API, todo);
  }

  public toggleCompleted(
    todoId: number,
    isCompleted: boolean
  ): Observable<Todo> {
    return this._http.patch<Todo>(`${environment.API}/${todoId}`, {
      completed: isCompleted,
    });
  }
}
