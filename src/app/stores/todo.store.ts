import { inject, Injectable, signal } from '@angular/core';
import { Todo } from '@interfaces/todo.interface';
import { TodoService } from '@services/todo.service';

@Injectable({ providedIn: 'root' })
export class todoStore {
  private _todos = signal<Todo[]>([]);

  private _todoService: TodoService = inject(TodoService);

  get todos() {
    return this._todos;
  }

  public loadTodos(): void {
    this._todoService.getTodos().subscribe({
      next: (data) => this._todos.set(data),
      error: (error) => console.error(error),
    });
  }

  public addTodo(todo: Todo) {
    this._todoService.createTodo(todo).subscribe({
      next: (newTodo) => this._todos.update((todos) => [newTodo, ...todos]),
      error: (error) => console.log(error),
    });
  }

  public toggleCompleted(todoId: number): void {
    const todo = this._todos().find((t) => t.id == todoId);

    if (todo) {
      //implements optimistic UI update
      const updatedCompleted = !todo.completed;
      //optimistically updates the state in the store
      this._todos.update((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id == todoId ? { ...todo, completed: updatedCompleted } : todo
        )
      ),
        this._todoService.toggleCompleted(todoId, updatedCompleted).subscribe({
          error: (error) => {
            //rollback if anything goes wrong
            this._todos.update((prevTodos) =>
              prevTodos.map((todo) =>
                todo.id == todoId
                  ? { ...todo, completed: todo.completed }
                  : todo
              )
            );
            console.error(error);
          },
        });
    }
  }
}
