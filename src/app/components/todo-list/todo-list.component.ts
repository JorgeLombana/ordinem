import { DatePipe } from '@angular/common';
import { Component, inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { todoStore } from '@stores/todo.store';

@Component({
  selector: 'ordinem-todo-list',
  imports: [ReactiveFormsModule, DatePipe, FormsModule, RouterModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css',
  providers: [{ provide: LOCALE_ID, useValue: 'es' }],
})
export class TodoListComponent implements OnInit {
  private _todoStore = inject(todoStore);
  public todos = this._todoStore.todos;

  public ngOnInit(): void {
    this._todoStore.loadTodos();
  }

  public goToTask(): void {
    //redirect to task
  }

  public checked(todoId: number | undefined): void {
    if (todoId) this._todoStore.toggleCompleted(todoId!);
  }
}
