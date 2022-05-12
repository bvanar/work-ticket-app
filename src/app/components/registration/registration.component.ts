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
  accountTypes = [{label: 'Personal', value: 'personal'}, {label: 'Team', value: 'team'}]

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
    console.log(this.newUser);
    if (this.newUser.userName == undefined ||
        this.newUser.password == undefined ||
        this.newUser.email == undefined ||
        (this.newUser.accountType == 'team' && this.newUser.companyName == undefined)
    ) {
      alert('invalid');
      return false;
    }

    if (this.newUser.password !== this.passwordConfirm) {
      alert('Passwords do not match');
      return false;
    }

    // valid username
    let validUsername = this.newUser.userName.indexOf(' ') >= 0;
    console.log(validUsername);
    if (validUsername) {
      alert('Username cant contain whitespace');
      return false;
    }

    // password must contain 8 char/number/symbol
    let validPassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/;
    if (!this.newUser.password.match(validPassword)) {
      alert('Password must contain an Uppercase/Lowercase/Number/Symbol');
      return false;
    }

    let validEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!this.newUser.email.match(validEmail)) {
      alert('Please enter a valid email');
      return false;
    }
    return true;
  }

}
