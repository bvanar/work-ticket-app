import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { environment } from "src/environments/environment";
import { ApiResponseDto, ApiResponseDtoTyped } from "../dto/api-response.dto";
import { Company } from "../models/company";

@Injectable({
  providedIn: 'root'
})

export class CompanyService {
  private GetCompanies$ = new BehaviorSubject<Company[]>([]);
  public getCompanies$ = this.GetCompanies$.asObservable();

  constructor(private http: HttpClient) {}

  private url = environment.apiUrl + 'company';
  getCompanies() {
    var sub = this.http.get<ApiResponseDtoTyped<Company[]>>(this.url);
    sub.subscribe(resp => {
      if (resp.success) {
        this.GetCompanies$.next(resp.data);
      }
      else {
        alert(resp.message);
      }
    });
  }

  addCompany(company: Company) {
    var sub = this.http.post<ApiResponseDtoTyped<Company>>(this.url, company);
    sub.subscribe(resp => {
      if (resp.success) {
        let companyList: Company[] = this.GetCompanies$.value;
        companyList.push(resp.data);
        this.GetCompanies$.next(companyList);
      }
      else {
        alert(resp.message);
      }
    });
  }

  updateCompany(company: Company) {
    var sub = this.http.patch<ApiResponseDto>(this.url, company);
    sub.subscribe(resp => {
      if (resp.success) {
        let companyList: Company[] = this.GetCompanies$.value;
        companyList.push(company);
        this.GetCompanies$.next(companyList);
      }
      else {
        alert(resp.message);
      }
    });
  }

  deleteCompany(companyId: number) {
    var sub = this.http.delete<ApiResponseDto>(this.url);
    sub.subscribe(resp => {
      if (resp.success) {
        let companyList: Company[] = this.GetCompanies$.value;
        companyList.filter(z => z.companyId !== companyId);
        this.GetCompanies$.next(companyList);
      }
      else {
        alert(resp.message);
      }
    });
  }
}
