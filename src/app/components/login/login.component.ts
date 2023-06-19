import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';

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

  constructor(private afAuth: AngularFireAuth) {}

  login() {
    console.log("click login")

    if (this.loginForm.invalid) {
      return;
    }

    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Login successful');
        if (!this.loginForm.valid) {
          console.log('invalid');
        }
      })
      .catch((error) => {
        console.log('Login error', error);
      });
  }

  signup() {
    console.log("click signup")
    if (this.signupForm.invalid) {
      return console.log(" signup invalid");
    }

    const email = this.signupForm.value.email as string;
    const password = this.signupForm.value.password as string;

    this.afAuth
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Signup successful');
        if (!this.loginForm.valid) {
          console.log('invalid');
        }
      })
      .catch((error) => {
        console.log('Signup error', error);
      });
  }

  toggleSignupForm() {
    this.showSignupForm = !this.showSignupForm;
    this.showLoginForm = false;
  }

  toggleLoginForm() {
    this.showLoginForm = true;
    this.showSignupForm = false;
  }


}


//aaaal@wp.pl
//12345678
