export class Job {
  jobId!: number;
  jobName!: string;
  companyId!: number;
  tasks: Task[] = [];
}
