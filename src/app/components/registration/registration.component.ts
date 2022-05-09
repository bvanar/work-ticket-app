import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RegisterUserDto } from 'src/app/dto/register-user.dto';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  newUser = new RegisterUserDto();
  passwordConfirm: string = '';
  accountTypes = [{label: 'Personal', value: 'personal'}, {label: 'Enterprise', value: 'enterprise'}]

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {

  }

  submit() {
    if (this.validate()) {
      let sub = this.userService.newUser(this.newUser);
      sub.subscribe(resp => {
        if (resp.success) {
          this.router.navigate(['']);
        }
        else {
          alert(resp.message);
        }
      })
    }
  }

  validate() {
    if (this.newUser.userName == '' ||
        this.newUser.password == '' ||
        this.newUser.email == '' ||
        (this.newUser.accountType == 'enterprise' && this.newUser.companyName == '')
    ) {
      if (this.newUser.password !== this.passwordConfirm) {
        alert('Passwords do not match');
        return false;
      }
      alert('invalid');
      return false;
    }
    return true;
  }

}
