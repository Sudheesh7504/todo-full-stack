import { Component } from '@angular/core';
import { ToDoService } from '../to-do.service';
import { ITodo } from '../to-do-model';

@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrl: './to-do.component.scss'
})
export class ToDoComponent {
  tasks: ITodo[] = [];
  newTask = '';

  constructor(private todoService: ToDoService) { }

  ngOnInit(): void {
    this.loadToDos();
  }

  loadToDos(): void {
    this.todoService.getAll().subscribe({
      next: (data: ITodo[]) => {
        this.tasks = data;
      },
      error: (err) => {
        console.error('Error fetching todos:', err);
      }
    })
  }

  addToDo(): void {
    if (!this.newTask.trim()) return;

    this.todoService.addToDo(this.newTask.trim()).subscribe({
      next: (todo: ITodo) => {
        this.tasks.push(todo);
        this.newTask = '';
      },
      error: (err) => {
        console.error('Error adding todo:', err);
      }
    })
  }

  toggleDone(item: any): void {
    this.todoService.updateToDo(item.id, { done: !item.done }).subscribe({
      next: (updatedTodo: ITodo) => {
        item.done = updatedTodo.done;
      },
      error: (err) => {
        console.error('Error updating todo:', err);
      }
    })
  }

  editTask(item: any, newTask: any): void {
    this.todoService.updateToDo(item.id, { task: newTask }).subscribe({
      next: (updatedTodo: ITodo) => {
        item.task = updatedTodo.task;
      },
      error: (err) => {
        console.error('Error updating todo:', err);
      }
    })
  }

  deleteTask(id: any): void {
    this.todoService.deleteToDo(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.id !== id);
      },
      error: (err) => {
        console.error('Error deleting todo:', err);
      }
    })
  }
}
