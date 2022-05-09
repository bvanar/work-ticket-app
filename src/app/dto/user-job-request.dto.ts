export class UserJobRequestDto {
  userId!: number;
  jobId!: number;

  constructor(userId: number, jobId: number) {
    this.userId = userId;
    this.jobId = jobId;
  }
}
