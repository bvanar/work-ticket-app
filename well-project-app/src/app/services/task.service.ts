import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponseDto, ApiResponseDtoTyped } from "../dto/api-response.dto";
import { Tasks } from "../models/tasks";

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  tasks: Tasks[] = [];
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl + 'task';

  async completeTask(task: Tasks, isComplete: boolean) : Promise<ApiResponseDtoTyped<Tasks>> {
    var sub = this.http.patch<ApiResponseDto>(this.baseUrl + '/complete/' + task.taskId + '/' + isComplete, {});
    return await firstValueFrom(sub);
  }

}
