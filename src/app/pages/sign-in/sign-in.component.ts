import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent implements OnInit {
  svg: SafeHtml | undefined;

  constructor(
    public authService: AuthenticationService,
    private sanitizer: DomSanitizer,
    private afAuth: AngularFireAuth
  ) {}

  images = [1, 2, 3, 4, 5, 6].map((n) => `assets/img/slide${n}.jpg`);
  ngOnInit(): void {
    this.svg = this.sanitizer
      .bypassSecurityTrustHtml(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
    <path fill="#e98df5" fill-opacity="1" d="M0,224L48,234.7C96,245,192,267,288,250.7C384,235,480,181,576,149.3C672,117,768,107,864,128C960,149,1056,203,1152,192C1248,181,1344,107,1392,69.3L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
  </svg>`);
  }
  hide = true;
  signIn(email: string, password: string) {
    this.authService.SignIn(email, password);
    // this.email = '';
    // this.password = '';
  }
}
