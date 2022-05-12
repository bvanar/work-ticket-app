import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { CompleteTaskDto } from 'src/app/dto/complete-task.dto';
import { LabelValuePair } from 'src/app/dto/label-value-pair';
import { UserJobRequestDto } from 'src/app/dto/user-job-request.dto';
import { Company } from 'src/app/models/company';
import { Job } from 'src/app/models/job';
import { Tasks } from 'src/app/models/tasks';
import { User } from 'src/app/models/user';
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
  selectedJobId: number = 0;
  taskDialog = false;
  task: Tasks = new Tasks();
  users: User[] = [];
  selectedUsers: User[] = [];
  assignUserDialog: boolean = false;

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
    this.loading = true;
    this.getJobs();

    await this.getCompanies();
  }

  getJobs() {
    this.jobService.getUserJobs(this.selectedCompanyId);
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
    console.log(this.companies);
  }

  completeTask(task: Tasks) {
    let completeTaskRequest = new CompleteTaskDto(task.taskId, task.completed, this.userService.currentUser?.userId!);
    let response = this.taskService.completeTask(completeTaskRequest);
    response.then(resp => {
      if (resp.success) {
        task.completed = resp.data.completed;
        task.completedDate = resp.data.completedDate;
        task.completedByUserName = resp.data.completedByUserName;
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

  async deleteJob(job: Job) {
    if (confirm('Are you sure you want to delete the job: ' + job.jobName)) {
      let resp = await firstValueFrom(await this.jobService.deleteJob(job));
      console.log('resp from delete', resp);
    }
  }

  isJobOwner(job: Job) {
    return job.ownerId == this.userService.currentUser?.userId;
  }

  hideJobDialog() {
    this.jobDialog = false;
    this.job = new Job();
  }

  hideTaskDialog() {
    this.taskDialog = false;
    this.task = new Tasks();
  }

  hideAssignUserDialog() {
    this.assignUserDialog = false;
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
    job.companyId = this.selectedCompanyId;
    let response = await firstValueFrom(await this.jobService.createJob(job));
    if (!response.success) {
      alert('Error creating the job: ' + response.message);
      return;
    }

    alert('Job added Successfully');
    this.jobs.push(response.data);
    this.jobDialog = false;
    this.loading = true;
    this.getJobs();
  }

  newJob() {
    this.jobDialog = true;
    this.job = new Job();
  }

  validateJob(job: Job) {
    if (job?.jobName == '' || job?.jobName == null) {
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
    if (this.task?.taskName == null || this.task?.taskName == '') {
      alert('Task name cant be empty');
      return;
    }

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

  async openAssignUsers(job: Job) {
    this.assignUserDialog = true;
    this.selectedJobId = job.jobId;
    let users = await firstValueFrom(this.userService.getAllUsers(this.selectedCompanyId));
    let selectedUsers = await firstValueFrom(this.userService.getUsersByJob(this.selectedJobId));

    if (users.success && selectedUsers.success) {
      this.users = users.data;
      this.users = this.users.filter(z => z.userId !== job.ownerId);
      this.selectedUsers = selectedUsers.data;
    }
  }

  async assignUsers() {
    let selectedUsers: UserJobRequestDto[] = this.selectedUsers.map((user) => {
      return new UserJobRequestDto(user.userId, this.selectedJobId);
    });
    let resp = await firstValueFrom(await this.jobService.assignUser(selectedUsers));
    console.log('resp from assign', resp);
    this.hideAssignUserDialog();
  }


  navigate(path: string) {
    this.router.navigate([path]);
  }

  showAdmin(): boolean {
    if (this.jobs) {
      let jobFound = this.jobs.find(a => a.ownerId == this.userService.currentUser?.userId && a.companyId !== 0);
      if (jobFound) {
        return true;
      }
    }

    return false;
  }

  companyOwner() {
    if(this.selectedCompanyId == 0) return true;

    let companyOwnerId = this.companyList.find(z => z.companyId == this.selectedCompanyId)?.ownerId;
    if (companyOwnerId == this.userService.currentUser?.userId) return true;

    return false;
  }
}
