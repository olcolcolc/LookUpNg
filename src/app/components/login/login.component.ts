import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
      ],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
      ],
    }),
  });

  signupForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.required,
        Validators.email,
      ],
      updateOn: 'blur',
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
      ],
    }),
  });

  showSignupForm: boolean = false;
  showLoginForm: boolean = true;

  error = '';
  errorMessage: string = "";

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // noSpaceAllowed(control: FormControl){
  //   if(control.value != null && control.value.indexOf(" ") != -1){
  //     return {noSpaceAllowed :true}
  //   }
  //   return null
  // }

  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {}

  // LOGIN FUNCTION
  login() {
    console.log("click login")

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    if (!password && !email) {
      this.errorMessage = 'Please check the fields';
      return;
    }
    else if (password && !email) {
      this.errorMessage = 'Please check the e-mail field';
      return;
    }
    else if (!this.isValidEmail(email)) {
      this.errorMessage = 'Enter a valid email address';
      return;
    }
    else if (!password && email) {
      this.errorMessage = 'Please check the password field';
      return;
    }

    this.authService.login(email, password)
      .then(() => {
        this.errorMessage = ""
        console.log('Login successful');
      })
      .catch((error: { message: string; }) => {
        this.errorMessage = error.message;
        console.log('Login error: ', error);
      });
  }


  // SIGNUP FUNCTION
  signup() {

    const email = this.signupForm.value.email as string;
    const password = this.signupForm.value.password as string;

    console.log("click signup")
    if (!password && !email) {
      this.errorMessage = 'Please check the fields';
      return;
    }
    else if (password && !email) {
      this.errorMessage = 'Please check the e-mail field';
      return;
    }
    else if (!this.isValidEmail(email)) {
      this.errorMessage = 'Enter a valid email address';
      return;
    }
    else if (!password && email) {
      this.errorMessage = 'Please check the password field';
      return;
    }
    else if (password.length < 8 && email && password) {
      this.errorMessage = 'Password must have min 8 characters';
      return;
    }

    this.authService.signup(email, password)
      .then(() => {
        console.log('Signup successful');
        this.errorMessage = ""
        if (!this.loginForm.valid) {
          this.errorMessage = "Signup invalid";
        }
      })
      .catch((error: { message: string; }) => {
        this.errorMessage = error.message;
        console.log('Signup error: ', error);
      });
  }



  // TOGGLES
  toggleSignupForm() {
    this.showSignupForm = !this.showSignupForm;
    this.showLoginForm = false;
  }

  toggleLoginForm() {
    this.showLoginForm = true;
    this.showSignupForm = false;
  }


}
