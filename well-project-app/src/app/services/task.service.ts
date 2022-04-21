import { Injectable } from "@angular/core";
import { Tasks } from "../models/tasks";

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  tasks: Tasks[] = [];
  constructor() {}

  getTasks(companyId: number): Tasks[] {
    for(let i = 1; i < 10; i++) {
      for(let j = 1; j < 10; j++) {
        this.tasks.push({
          taskId: j,
          companyId: i,
          taskName: 'task-' + j,
          taskOrder: j,
          completed: true,
          completedDate: '',
          isDeleted: false
        });
      }
    }

    return this.tasks.filter(z => z.companyId == companyId);
  }
}
