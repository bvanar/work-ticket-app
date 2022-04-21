export class User {
  userId!: number;
  userName!: string;
  password!: string;
  companyId!: number;
  lastLogin!: string;
  isAdmin: boolean = false;
  isDeleted: boolean = false;
}
