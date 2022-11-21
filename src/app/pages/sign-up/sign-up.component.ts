import { Component, OnInit } from '@angular/core';
import { FormControl, MinValidator, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  constructor(private authenticationService: AuthenticationService) {}
  ngOnInit(): void {}

  hide = true;

  signUp(email: string, password: string) {
    console.log(email);
    console.log(password);
    this.authenticationService.SignUp(email, password);
  }
}
