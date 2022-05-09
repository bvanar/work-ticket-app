import { Component, OnInit } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { InviteUserRequestDto } from 'src/app/dto/invite-user-request.dto';
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
  selectedCompanyId: number = 0;
  inviteRequest: InviteUserRequestDto = new InviteUserRequestDto();

  clonedUsers: { [s: string]: User; } = {};

  constructor(private userService: UserService,
              private companyService: CompanyService) { }

  async ngOnInit() {
    this.loading = true;
    await this.getUsers();
    this.companyList = (await firstValueFrom(this.companyService.getCompanies())).data;

    this.companyList = this.companyList.filter(z => z.companyId !== 0);
    this.companies = this.companyList.map((company) => {
      return { label: company.companyName, value: company.companyId }
    });

    this.loading = false;
  }

  editUser(user: User) {
    this.user = user;
    this.openDialog();
  }

  async getUsers() {
    this.userList = (await firstValueFrom(this.userService.getAllUsers(this.selectedCompanyId))).data;
  }

  async deleteUser(user: User) {
    // remove the user from the company
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

  async inviteUser() {
    this.inviteRequest.companyId = this.selectedCompanyId;
    let resp = (await firstValueFrom(this.userService.inviteUser(this.inviteRequest)));
    if (resp.success) {
      this.getUsers();
      this.hideDialog();
    } else {
      alert(resp.message);
    }
  }

  // async saveUser(user: User) {
  //   if (!(await this.validateUser)) {
  //     return false;
  //   }
  //   let response = await firstValueFrom(this.userService.updateUser(user));
  //     if (response.success) {
  //       this.ngOnInit();
  //     } else {
  //       alert(response.message);
  //       return;
  //     }
  //   return;
  // }

  // validateUser(user: User) {
  //   if (user) {
  //     if (user.userName == '' || user.email == '') {
  //       return false;
  //     }
  //     else {
  //       return true;
  //     }
  //   }

  //   return false;
  // }

  hideDialog() {
    this.userDialog = false;
    this.user = new User();
  }

  openDialog() {
    this.userDialog = true;
  }
}
