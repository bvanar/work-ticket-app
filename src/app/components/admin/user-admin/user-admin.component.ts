import { Component, OnInit } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { LabelValuePair } from 'src/app/dto/label-value-pair';
import { Company } from 'src/app/models/company';
import { User } from 'src/app/models/user';
import { CompanyService } from 'src/app/services/company.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.css']
})
export class UserAdminComponent implements OnInit {
  userList: User[] = [];
  companyList: Company[] = [];
  loading = false;
  companies!: LabelValuePair[];
  user = new User();
  userDialog = false;

  clonedUsers: { [s: string]: User; } = {};

  constructor(private userService: UserService,
              private companyService: CompanyService) { }

  async ngOnInit() {
    this.loading = true;
    this.userList = (await firstValueFrom(this.userService.getAllUsers())).data;
    this.companyList = (await firstValueFrom(this.companyService.getCompanies())).data;

    this.companies = this.companyList.map((company) => {
      return { label: company.companyName, value: company.companyId }
    });

    this.loading = false;
  }

  editUser(user: User) {
    this.user = user;
    this.openDialog();
  }

  async deleteUser(user: User) {
    // delete the user
    user.isDeleted = true;
    if (!confirm('Are you sure you want to delete this user?')) {
      return;
    }
    let response = await firstValueFrom(this.userService.updateUser(user));
    if (response.success) {
      this.userList = this.userList.filter(u => u.userId !== user.userId);
    } else {
      alert(response.message);
    }
  }

  async saveUser(user: User) {
    if (!(await this.validateUser)) {
      return false;
    }
    if (user.userId == 0) {
      // post
      let response = await firstValueFrom(this.userService.newUser(user));
      if (response.success) {
        this.userList.push(response.data);
      } else {
        alert(response.message);
      }

      this.hideDialog();
    } else {
      let response = await firstValueFrom(this.userService.updateUser(user));
      if (response.success) {
        this.ngOnInit();
      } else {
        alert(response.message);
        return;
      }
    }
    return;
  }

  validateUser(user: User) {
    if (user) {
      if (user.userName == '' || user.email == '') {
        return false;
      }
      else {
        return true;
      }
    }

    return false;
  }

  resetPassword(user: User) {
    // call reset password endpoint
  }

  hideDialog() {
    this.userDialog = false;
    this.user = new User();
  }

  openDialog() {
    this.userDialog = true;
  }
}
