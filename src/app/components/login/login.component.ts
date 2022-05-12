import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: string = '';
  password: string = '';
  loading = false;

  constructor(private userService: UserService,
              private router: Router) { }

  ngOnInit(): void {
    if (this.userService.isLoggedIn) {
      this.router.navigate(['tasks']);
    }
  }

  login() {
    this.loading = true;
    this.userService.login(this.userName, this.password)
        .pipe(take(1))
        .subscribe(x => {
          if (x.success) {
            this.userService.currentUser = x.data;
            this.loading = false;
            this.router.navigate(['tasks']);
          } else {
            alert(x.message);
          }
        });
  }

  register() {
    this.router.navigate(['register']);
  }

}
