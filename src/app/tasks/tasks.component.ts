import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import TaskResponse from '../responses/task-response';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  newTaskString: string = '';
  tasks$: Observable<TaskResponse[]> | undefined;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks$ = this.taskService.getTasks();
  }

  addTask(): void {
    if (!this.newTaskString){
      return;
    }
    let task: TaskResponse = {
      id: 0,
      isCompleted: false,
      name: this.newTaskString,
      ts: new Date()
    };
    this.taskService.saveTask(task).subscribe(() => this.tasks$ = this.taskService.getTasks());
  }

  updateTask(task: TaskResponse) {
    console.log('inside updatetask');
    console.log(`task id is ${task.id}`);
    task.isCompleted = !task.isCompleted;
    this.taskService.updateTask(task).subscribe(() => {});

  }

  removeTask(task: TaskResponse) {
    console.log('inside removeTask');
    console.log(`task id is ${task.id}`);
    this.taskService.deleteTask(task.id).subscribe(() => this.tasks$ = this.taskService.getTasks());
  }

}
