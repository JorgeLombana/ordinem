import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { Priority } from '@interfaces/todo.interface';

@Component({
  selector: 'ordinem-create-task',
  imports: [ReactiveFormsModule, MatIconModule, RouterModule, CommonModule],
  templateUrl: './create-task.component.html',
  styleUrl: './create-task.component.css',
})
export class CreateTaskComponent {
  public taskForm = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    completed: new FormControl(''),
    priority: new FormControl(''),
    createdAt: new FormControl(''),
    updatedAt: new FormControl(''),
    tags: new FormControl<string[] | null>([]), // Define tags como un array de strings
  });
  public priorityEnum = Priority;
  public priority: WritableSignal<Priority> = signal(Priority.low);
  public tags: WritableSignal<Array<string>> = signal([]);

  public onSubmit(): void {}

  public setPriority(priority: Priority): void {
    this.priority.set(priority);
  }
  public addTag(tagInput: string): void {
    //change this...
    const currentTags = this.taskForm.value.tags || [];
    const newTag = tagInput.trim();

    if (newTag && !currentTags.includes(newTag)) {
      this.taskForm.patchValue({
        tags: [...currentTags, newTag],
      });
    }
  }
}
