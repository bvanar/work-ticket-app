import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, firstValueFrom } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponseDto, ApiResponseDtoTyped } from "../dto/api-response.dto";
import { CompleteTaskDto } from "../dto/complete-task.dto";
import { Tasks } from "../models/tasks";

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  tasks: Tasks[] = [];
  constructor(private http: HttpClient) {}

  baseUrl = environment.apiUrl + 'task';

  async completeTask(task: CompleteTaskDto) : Promise<ApiResponseDtoTyped<Tasks>> {
    var sub = this.http.patch<ApiResponseDto>(this.baseUrl + '/complete', task);
    return await firstValueFrom(sub);
  }

  async createTask(task: Tasks) {
    var sub = this.http.post<ApiResponseDtoTyped<Tasks>>(this.baseUrl, task);
    return await firstValueFrom(sub);
  }

  async deleteTask(task: Tasks) {
    var sub = this.http.delete<ApiResponseDto>(this.baseUrl + '/' + task.taskId);
    return await firstValueFrom(sub);
  }

  async updateTask(task: Tasks) {
    var sub = this.http.patch<ApiResponseDto>(this.baseUrl, task);
    return await firstValueFrom(sub);
  }

}
