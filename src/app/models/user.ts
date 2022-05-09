export class User {
  userId: number = 0;
  userName!: string;
  password!: string;
  lastLogin!: string;
  isAdmin: boolean = false;
  isDeleted: boolean = false;
  email!: string;
}
