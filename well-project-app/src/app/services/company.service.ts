import { Injectable } from "@angular/core";
import { Company } from "../models/company";

@Injectable({
  providedIn: 'root'
})

export class CompanyService {

  companies: Company[] = [];
  constructor() {}

  getCompanies(): Company[] {
    for(let i = 0; i < 10; i++) {
      this.companies.push({
        companyId: i,
        companyName: 'test-' + i
      });
    }

    return this.companies;
  }
}
