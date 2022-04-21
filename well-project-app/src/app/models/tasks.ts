export class Tasks {
  taskId!: number;
  companyId!: number;
  taskName!: string;
  taskOrder!: number;
  completed: boolean = false;
  completedDate?: string;
  isDeleted: boolean = false;
}
