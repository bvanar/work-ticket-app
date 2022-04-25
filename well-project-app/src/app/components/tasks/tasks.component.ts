import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { Job } from 'src/app/models/job';
import { Tasks } from 'src/app/models/tasks';
import { JobService } from 'src/app/services/job.service';
import { TaskService } from 'src/app/services/task.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  jobs: Job[] = [];
  destructor$: Subject<void> = new Subject();
  loading = false;

  constructor(private taskService: TaskService,
              private jobService: JobService,
              private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['../']);
    }


    this.initSubscriptions();
    this.loading = true;
    this.jobService.getUserJobs();
  }

  initSubscriptions() {
    this.jobService.getUserJobs$
        .pipe(takeUntil(this.destructor$))
        .subscribe(data => {
          this.jobs = data;
          this.loading = false;
        });
  }

  completeTask(task: Tasks) {
    let response = this.taskService.completeTask(task, task.completed);
    response.then(resp => {
      if (resp.success) {
        task.completed = resp.data.completed;
        task.completedDate = resp.data.completedDate;
      } else {
        alert(resp.message);
        task.completed = !task.completed;
      }
    });
  }

  checkUserAdmin() : boolean {
    return this.userService.currentUser!.isAdmin;
  }

  calculateCompletedTasks(tasks: Tasks[]): number {
    return tasks.filter(x => x.completed == true).length;
  }

  onRowEditInit(task: Tasks) {

  }

  onRowEditCancel(task: Tasks, rowIndex: number) {

  }

  onRowEditSave(task: Tasks) {

  }

  ngOnDestroy(): void {
    this.destructor$.next();
  }

}
