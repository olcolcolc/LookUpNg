import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('E-mail', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(8)
      ],
      updateOn: 'blur'
    }),
    password: new FormControl('Password', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
      ]
    })
  });

  constructor() {}

  signupForm = new FormGroup({
    email: new FormControl('E-mail', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(8),
      ],
      updateOn: 'blur',
    }),
    password: new FormControl('Password', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$'),
      ],
    }),
  });

  showSignupForm: boolean = false;
  showLoginForm: boolean = true;

  submitLogin() {
    console.log(this.loginForm.value);
  }

  submitSignup() {
    console.log(this.signupForm.value);
  }

  toggleSignupForm() {
    this.showSignupForm = !this.showSignupForm;
    this.showLoginForm = false;
  }

  toggleLoginForm() {
    this.showLoginForm = true;

  }
}
