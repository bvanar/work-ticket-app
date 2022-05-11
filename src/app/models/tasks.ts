export class Tasks {
  taskId: number = 0;
  jobId!: number;
  taskName!: string;
  taskOrder!: number;
  completed: boolean = false;
  completedDate?: string;
  isDeleted: boolean = false;
  completedByUserName: string = '';
}
