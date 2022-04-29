import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponseDto, ApiResponseDtoTyped } from "../dto/api-response.dto";
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

  getUserJobs(isAdmin: boolean, companyId: number) {
    var sub;
    if (isAdmin && companyId !== 0) {
      sub = this.http.get<ApiResponseDtoTyped<Job[]>>(this.baseUrl + '/' + companyId);
    }  else {
      sub = this.http.get<ApiResponseDtoTyped<Job[]>>(this.baseUrl + '/user-jobs/' + this.userService.currentUser?.userId);
    }

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
}
