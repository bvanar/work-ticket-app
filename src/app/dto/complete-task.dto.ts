export class CompleteTaskDto {
  taskId!: number;
  completed!: boolean;
  completedByUserId: number = null!;

  constructor(taskId: number, completed: boolean, userId: number) {
    this.taskId = taskId;
    this.completed = completed;
    this.completedByUserId = userId;
  }
}
