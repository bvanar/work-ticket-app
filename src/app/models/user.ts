export class User {
  userId: number = 0;
  userName!: string;
  password!: string;
  companyId!: number;
  lastLogin!: string;
  isAdmin: boolean = false;
  isDeleted: boolean = false;
  email!: string;
}
