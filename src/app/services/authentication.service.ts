import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SnackbarService } from './snackbar.service';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';

export interface User {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string;
  emailVerified: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  userData: any;
  constructor(
    private angularFireAuth: AngularFireAuth,
    private snackbar: SnackbarService,
    private router: Router,
    private angularFireStore: AngularFirestore
  ) {
    //Store user info in local storage
    this.angularFireAuth.authState.subscribe((user: any) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        // JSON.parse(localStorage.getItem('user')!);
        //Redirect to local
        this.router.navigateByUrl('/dashboard');
      } else {
        localStorage.setItem('user', 'null');
        // JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user && user.emailVerified !== false ? true : false;
  }

  // Email COnfirmation
  SendVerificationMail() {
    return this.angularFireAuth.currentUser
      .then((user: any) => {
        return user.sendEmailVerification();
      })
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }

  /* Sign up */
  SignUp(email: string, password: string) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res: any) => {
        //console.log('You are Successfully signed up!', res);
        /* Call the SendVerificaitonMail() function when new user sign
        up and returns promise */
        this.SendVerificationMail();
        this.SetUserData(res.user);
        this.snackbar.openSnackBar('You have been registered successfully!');
      })
      .catch((error: { message: any; code: any }) => {
        //console.log('Something is wrong:', error.message);
        this.displayErrrMsg(error.code);
      });
  }

  /* Sign in */
  SignIn(email: string, password: string) {
    this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      .then((res: any) => {
        this.angularFireAuth.authState.subscribe((user) => {
          if (user != null) {
            if (!user?.emailVerified) {
              //console.log('inside signin - email verfied?');
              console.log(!user?.emailVerified);
              this.snackbar.openSnackBar('Your Email has not verified yet!');
              this.router.navigateByUrl('/verify-email-address');
            } else {
              this.snackbar.openSnackBar('Your login was successful!');
              console.log(res);
              this.router.navigateByUrl('/dashboard');
            }
          }
        });
        this.SetUserData(res.user);
      })
      .catch((error: { message: any; code: any }) => {
        //console.log('Something is wrong:', error.message);
        this.displayErrrMsg(error.code);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.angularFireStore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified,
    };
    return userRef.set(userData, {
      merge: true,
    });
  }

  /* Sign out */
  SignOut() {
    //console.log('signout');
    return this.angularFireAuth.signOut().then((res) => {
      console.log(res);
      localStorage.removeItem('user');
      this.router.navigateByUrl('/sign-in');
    });
  }

  displayErrrMsg(code: any) {
    if (code == 'auth/email-already-in-use') {
      this.snackbar.openSnackBar(
        'This email address is in use already. Try a different one!'
      );
    }
    if (code == 'auth/invalid-email') {
      this.snackbar.openSnackBar('Ambiguous email. Try a valid one!');
    }
    if (code == 'auth/weak-password') {
      this.snackbar.openSnackBar('Poor Password Try a more powerful one!');
    }
    if (code == 'auth/wrong-password') {
      this.snackbar.openSnackBar(
        'The password is invalid, or the user does not have a password!'
      );
    }
    if (code == 'auth/user-not-found') {
      this.snackbar.openSnackBar(
        'There is no user record corresponding to this identifier. The user may have been deleted! '
      );
    }
  }
}
