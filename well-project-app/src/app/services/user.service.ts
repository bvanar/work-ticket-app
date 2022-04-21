import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { User } from "../models/user";

@Injectable({
    providedIn: "root"
})

export class UserService {
    constructor(private http: HttpClient) {}
    currentUser: User = new User();

    testUser: User = new User();

    login(userName: string, password: string): boolean {
      this.initUser();
      console.log(password, this.testUser.password);
      if (password == this.testUser.password) {
        this.currentUser = this.testUser;
        return true;
      }
      else {
        return false;
      }
    }

    initUser() {
      this.testUser.userId = 1;
      this.testUser.userName = 'taylor';
      this.testUser.password = 'test';
      this.testUser.companyId = 1;
      this.testUser.isAdmin = true;
      this.testUser.isDeleted = false;
      this.testUser.lastLogin = '4/20/2022';

      this.currentUser = this.testUser;
    }

    testApiCall() {
        let sub = this.http.get<any>('https://t1b9ekczia.execute-api.us-east-1.amazonaws.com/dev/users');
        sub.subscribe((resp: any) => {
            console.log(resp);
        });

        return sub;
    }
}
