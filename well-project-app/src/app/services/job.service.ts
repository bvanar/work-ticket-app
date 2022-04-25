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

  getUserJobs() {
    var sub = this.http.get<ApiResponseDtoTyped<Job[]>>(this.baseUrl + '/user-jobs/' + this.userService.currentUser?.userId);
    sub.subscribe(resp => {
      if (resp.success) {
        this.GetUserJobs$.next(resp.data);
      }
      else {
        alert(resp.message);
      }
    });
  }
}
