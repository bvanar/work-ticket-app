import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponseDto, ApiResponseDtoTyped } from "../dto/api-response.dto";
import { Company } from "../models/company";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  constructor(private http: HttpClient, private userService: UserService) {}

  private url = environment.apiUrl + 'company';
  getCompanies() {
    var sub = this.http.get<ApiResponseDtoTyped<Company[]>>(this.url + '/' + this.userService.currentUser?.userId);
    return sub;
  }

  addCompany(company: Company) {
    var sub = this.http.post<ApiResponseDtoTyped<Company>>(this.url, company);
    return sub;
  }

  updateCompany(company: Company) {
    var sub = this.http.patch<ApiResponseDto>(this.url, company);
    return sub;
  }

  deleteCompany(companyId: number) {
    var sub = this.http.delete<ApiResponseDto>(this.url);
    return sub;
  }

  removeUser(userId: number, companyId: number) {
    var sub = this.http.delete<ApiResponseDto>(this.url + `/${companyId}/user/${userId}`);
    return sub;
  }
}
