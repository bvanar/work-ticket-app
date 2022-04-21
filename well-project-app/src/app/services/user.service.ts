import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})

export class UserService {
    constructor(private http: HttpClient) {}

    testApiCall() {
        let sub = this.http.get<any>('https://t1b9ekczia.execute-api.us-east-1.amazonaws.com/dev/users');
        sub.subscribe((resp: any) => {
            console.log(resp);
        });

        return sub;
    }
}