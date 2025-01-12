import { DatePipe } from '@angular/common';
import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Priority, Todo } from '@interfaces/todo.interface';
import { todoStore } from '@stores/todo.store';

@Component({
  selector: 'ordinem-todo-list',
  imports: [ReactiveFormsModule, DatePipe, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class TodoListComponent implements OnInit {
  public createTodoForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    priority: new FormControl(Priority.low, [Validators.required]),
    tags: new FormControl(''),
  });
  private _todoStore = inject(todoStore);
  public todos = this._todoStore.todos;
  // public

  public ngOnInit(): void {
    this._todoStore.loadTodos();
  }

  public onSubmit(): void {
    const formValue = this.createTodoForm.value;
    let newTodo: Todo = {
      title: formValue.title!,
      description: formValue.description!,
      completed: false,
      priority: formValue.priority!,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this._todoStore.addTodo(newTodo);
  }

  public goToTask(): void {
    //redirect to task
  }

  public checked(todoId: number | undefined): void {
    if (todoId) this._todoStore.toggleCompleted(todoId!);
  }
}
