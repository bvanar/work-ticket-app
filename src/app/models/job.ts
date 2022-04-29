export class Job {
  jobId: number = 0;
  jobName!: string;
  companyId!: number;
  tasks: Task[] = [];
}
