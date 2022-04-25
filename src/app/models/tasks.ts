export class Tasks {
  taskId!: number;
  jobId!: number;
  taskName!: string;
  taskOrder!: number;
  completed: boolean = false;
  completedDate?: string;
  isDeleted: boolean = false;
}
