import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponseDto, ApiResponseDtoTyped } from "../dto/api-response.dto";
import { UserJobRequestDto } from "../dto/user-job-request.dto";
import { Job } from "../models/job";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private GetUserJobs$: BehaviorSubject<Job[]> = new BehaviorSubject<Job[]>([]);
  public getUserJobs$ = this.GetUserJobs$.asObservable();

  baseUrl = environment.apiUrl + 'job';

  constructor(private userService: UserService,
              private http: HttpClient) {}

  getUserJobs(companyId: number) {
    var sub;
    sub = this.http.get<ApiResponseDtoTyped<Job[]>>(this.baseUrl + '/user/' + this.userService.currentUser?.userId + '/company/' + companyId);

    sub.subscribe(resp => {
      if (resp.success) {
        this.GetUserJobs$.next(resp.data);
      }
      else {
        alert(resp.message);
      }
    });
  }

  async createJob(job: Job) {
    job.ownerId = this.userService.currentUser?.userId;
    console.log(job);
    var sub = this.http.post<ApiResponseDtoTyped<Job>>(this.baseUrl, job);
    return sub;
  }

  async deleteJob(job: Job) {
    var sub = this.http.delete<ApiResponseDto>(this.baseUrl + '/' + job.jobId);
    return sub;
  }

  async editJob(job: Job) {
    var sub = this.http.patch<ApiResponseDtoTyped<Job>>(this.baseUrl, job);
    return sub;
  }

  async assignUser(request: UserJobRequestDto[]) {
    var sub = this.http.post<ApiResponseDto>(this.baseUrl + '/assign-user', request);
    return sub;
  }
}
