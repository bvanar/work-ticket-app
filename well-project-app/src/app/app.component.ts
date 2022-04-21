import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls:
  [
    './app.component.css'
  ]
})
export class AppComponent implements OnInit {
  title = 'well-project-app';
  response: any;

  constructor(private userService: UserService) {}

  async ngOnInit() {
    // console.log('calling the test api');
    // await this.userService.testApiCall().subscribe((resp: any) => {
    //   this.response = resp;
    // });
  }
}
