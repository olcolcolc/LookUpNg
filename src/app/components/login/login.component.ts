import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import 'firebase/auth';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  email: string | undefined;
  password: string | undefined;
  loggedIn: boolean | undefined;
  error: string | undefined;


  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(8)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
    ])
  });

  signupForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(8)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
    ])
  });

  // ...



  constructor(private afAuth: AngularFireAuth) {
    this.loggedIn = false;
    this.error = '';
  }


  showSignupForm: boolean = false;
  showLoginForm: boolean = true;

  submitLogin(loginFormRef: any) {
    this.email = loginFormRef.value.email;
    this.password = loginFormRef.value.password;
    console.log(this.email, this.password);
  }

  submitSignup(signupFormRef: any) {
    this.email = signupFormRef.value.email;
    this.password = signupFormRef.value.password;
    console.log(this.email, this.password);
  }

  toggleSignupForm() {
    this.showSignupForm = !this.showSignupForm;
    this.showLoginForm = false;
  }

  toggleLoginForm() {
    this.showLoginForm = true;

  }

  async login() {
    try {
      if (this.email !== undefined && this.password !== undefined) {
        await this.afAuth.signInWithEmailAndPassword(this.email, this.password);
        this.loggedIn = true;
        this.error = '';
        console.log(this.email, this.password)
      }
    } catch (error: any) {
      this.error = error.message;
      this.loggedIn = false;
    }
  }




  async signUp() {
    try {
      if (this.email !== undefined && this.password !== undefined) {
        await this.afAuth.createUserWithEmailAndPassword(this.email, this.password);
        this.loggedIn = true;
        this.error = '';
        console.log(this.email, this.password)

      }
    } catch (error: any) {
      this.error = error.message;
      this.loggedIn = false;
    }
  }

  logout() {
    this.afAuth.signOut();
    this.loggedIn = false;
  }
}
