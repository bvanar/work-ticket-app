import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { LabelValuePair } from 'src/app/dto/label-value-pair';
import { Company } from 'src/app/models/company';
import { Job } from 'src/app/models/job';
import { Tasks } from 'src/app/models/tasks';
import { CompanyService } from 'src/app/services/company.service';
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
  isAdmin = false;
  jobDialog = false;
  job: Job = new Job();
  companies: LabelValuePair[] = [];
  companyList: Company[] = [];
  selectedCompanyId: number = 0;
  taskDialog = false;
  task: Tasks = new Tasks();

  constructor(private taskService: TaskService,
              private jobService: JobService,
              private userService: UserService,
              private router: Router,
              private companyService: CompanyService) { }

  async ngOnInit() {
    if (!this.userService.isLoggedIn) {
      this.router.navigate(['../']);
    }

    this.isAdmin = this.userService.currentUser?.isAdmin!;

    this.initSubscriptions();
    this.getJobs();
    this.loading = true;

    await this.getCompanies();
  }

  getJobs() {
    this.jobService.getUserJobs(this.isAdmin, this.selectedCompanyId);
  }

  initSubscriptions() {
    this.jobService.getUserJobs$
        .pipe(takeUntil(this.destructor$))
        .subscribe(data => {
          this.jobs = data;
          this.loading = false;
        });
  }

  async getCompanies() {
    let response = await firstValueFrom(this.companyService.getCompanies());

    if (!response.success) {
      alert(response.message);
    }
    this.companyList = response.data;
    this.companies = this.companyList.map((company) => {
      return { label: company.companyName, value: company.companyId }
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
    if (tasks?.length > 0) {
      return tasks.filter(x => x.completed == true).length;
    } else {
      return 0;
    }
  }

  editJob(job: Job) {
    this.jobDialog = true;
    this.job = job;
  }

  deleteJob(job: Job) {
    if (confirm('Are you sure you want to delete the job: ' + job.jobName)) {
      // delete api call
    }
  }

  hideJobDialog() {
    this.jobDialog = false;
    this.job = new Job();
  }

  ngOnDestroy(): void {
    this.destructor$.next();
  }

  async saveJob(job: Job) {
    if (!this.validateJob(job)) {
      return;
    }

    let response = await firstValueFrom(await this.jobService.editJob(job));
    if (!response.success) {
      alert('Error creating the job: ' + response.message);
      return;
    }

    let targetJob = this.jobs.find(z => z.jobId == job.jobId);
    if (targetJob) {
      targetJob.jobName = job.jobName;
    }

    alert('Job Saved Successfully');
    this.jobDialog = false;
    this.job = new Job();
  }

  async addJob(job: Job) {
    if (!this.validateJob(job)) {
      return;
    }

    let response = await firstValueFrom(await this.jobService.createJob(job));
    if (!response.success) {
      alert('Error creating the job: ' + response.message);
      return;
    }

    alert('Job added Successfully');
    this.jobs.push(response.data);
    this.jobDialog = false;
  }

  newJob() {
    this.jobDialog = true;
    this.job = new Job();
  }

  validateJob(job: Job) {
    if (job.jobName == '') {
      alert('Job Name must be filled in');
      return false;
    }
    return true;
  }

  newTask(jobId: number) {
    this.taskDialog = true;
    this.task = new Tasks();
    this.task.jobId = jobId;
  }

  editTask(task: Tasks) {
    this.taskDialog = true;
    this.task = task;
  }

  async saveTask() {
    console.log('current task', this.task);
    if (this.task.taskId == 0) {
      let response = await this.taskService.createTask(this.task);
      if (response.success) {
        this.getJobs();
        this.taskDialog = false;
      } else {
        alert(response.message);
      }
    } else {
      let response = await this.taskService.updateTask(this.task);
      if (response.success) {
        this.getJobs();
        this.taskDialog = false;
      } else {
        alert(response.message);
      }
    }
  }

  async deleteTask(task: Tasks) {
    let response = await this.taskService.deleteTask(this.task);
    if (response.success) {
      this.getJobs();
    } else {
      alert(response.message);
    }
  }
}
