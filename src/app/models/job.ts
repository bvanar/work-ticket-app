export class Job {
  jobId: number = 0;
  jobName!: string;
  companyId!: number;
  ownerId!: number;
  tasks: Task[] = [];
}
