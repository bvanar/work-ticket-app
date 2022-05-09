export class RegisterUserDto {
  userName!: string;
  password!: string;
  companyName?: string;
  accountType: string = 'personal';
  email!: string;
}
