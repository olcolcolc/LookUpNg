import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service'
import { ToastService } from 'src/app/services/toast.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {

  // Login Form
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

  // Sign up Form
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

  // Flags to control the visibility of sign-up/login forms
  showSignupForm: boolean = false;
  showLoginForm: boolean = true;


  // Variable to store and display error messages
  errorMessage: string = "";

  constructor(private afAuth: AngularFireAuth, private authService: AuthService,
    private toastService: ToastService) {}



  // LOGIN FUNCTION
  async login() {
    // Get the email and password from the login form
    const email = this.loginForm.value.email as string;
    const password = this.loginForm.value.password as string;

    if (!this.validation(email, password)) {
      return;
    }

    try {
      await this.authService.signInWithEmailAndPassword(email, password);
      this.errorMessage = "";
      this.toastService.setSuccessMessage(`${email} You're logged in!`);
      console.log('Login successful');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        this.errorMessage = 'User not found';
      } else if (error.code === 'auth/wrong-password') {
        this.errorMessage = 'Wrong password';
      } else {
        this.errorMessage = error.message;
      }
    }
  }


  // SIGNUP FUNCTION
  signup() {
    const email = this.signupForm.value.email as string;
    const password = this.signupForm.value.password as string;

    if (!this.validation(email, password)) {
      return; // Return nothing if the input validation fails
    }

    this.authService.signup(email, password)
      .then(() => {
        console.log('Signup successful');
        this.errorMessage = ""; // Clear the error message

        // Sending successMessage only if validation is true
        this.toastService.setSuccessMessage("You're signed up!");
      })
      .catch((error: { message: string; }) => {
        this.errorMessage = error.message; // Set the error message to the specific error message
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

  // VALIDATORS
  validation(email: string, password: string): boolean {
    if (!email || !password) {
      this.errorMessage = 'Please check the fields';
      return false;
    } else if (!this.isValidEmail(email)) {
      this.errorMessage = 'Enter a valid email address';
      return false;
    } else if (password.length < 8) {
      this.errorMessage = 'Password must have min 8 characters';
      return false;
    } else if (email.indexOf(" ") !== -1) {
      this.errorMessage = 'No space allowed';
      return false;
    }
    this.errorMessage = ''; /// Clear the error message if none of the conditions are met
    return true;
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular expression for email validation
    return emailRegex.test(email); // Check if the email matches the regular expression
  }

}
