import { Component, OnInit } from '@angular/core';
import { Tasks } from 'src/app/models/tasks';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: Tasks[] = [];

  constructor(private taskService: TaskService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.initUser();
    console.log(this.userService.currentUser);
    this.tasks = this.taskService.getTasks(this.userService.currentUser.companyId);
    console.log('here are the tasks', this.tasks);
  }

}
