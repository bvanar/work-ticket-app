import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { publishReplay, refCount, share, take } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponseDto, ApiResponseDtoTyped } from "../dto/api-response.dto";
import { UserRequestDto } from "../dto/user-request.dto";
import { User } from "../models/user";
import { SessionStorageService } from "./session-storage.service";

@Injectable({
    providedIn: "root"
})

export class UserService {
    constructor(private http: HttpClient,
                private sessionStorageService: SessionStorageService,
                private router: Router) {}

    public userSSKey = 'current_user';

    get isLoggedIn(): boolean {
      if (this.currentUser?.userId) {
        return true;
      }
      return false;
    }

    get currentUser(): User | null{
      var userString = this.sessionStorageService.get('current_user');
      if (userString) {
        let user = <User>JSON.parse(userString!);
        return user;
      }
      else {
        return null;
      }
    }

    set currentUser(user: User | null) {
      this.sessionStorageService.remove(this.userSSKey);
      this.sessionStorageService.set(this.userSSKey, JSON.stringify(user));
    }

    login(userName: string, password: string) {
      let userRequest = new UserRequestDto();
      userRequest.userName = userName;
      userRequest.password = password;

      var sub = this.http.post<ApiResponseDtoTyped<User>>(environment.apiUrl + 'user/login', userRequest);
      return sub;
    }

    logout() {
      this.currentUser = new User();
      this.sessionStorageService.remove(this.userSSKey);
      this.router.navigate(['../'])
    }
}
