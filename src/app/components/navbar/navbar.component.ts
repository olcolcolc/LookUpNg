import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [trigger('fadeInOut', [
    state('open', style({
      opacity: 1,
    })),
    state('close', style({
      opacity: 0
    })),
    transition('open => close', [animate('0.5s ease-out')]), // Transition from 'open' state to 'close' state with fade-out animation
    transition('close => open', [animate('0.5s ease-in')]), // Transition from 'close' state to 'open' state with fade-in animation
  ])]
})
export class NavbarComponent implements OnInit {
  public isLoginComponentVisible: boolean = false; // Flag to control the visibility of the login component
  userEmail: string | null | undefined; // Variable to store the user's email
  loggedIn: boolean = false; // Flag to indicate if the user is logged in or not

  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn; // Update the loggedIn flag based on the authentication service's logged-in status
      if (loggedIn) {
        this.isLoginComponentVisible = false; // If the user is logged in, hide the login component
      }
    });
  }

  toggleLoginComponent(): void {
    this.isLoginComponentVisible = !this.isLoginComponentVisible; // Toggle the visibility of the login component
  }

  closeLoginComponent(): void {
    this.isLoginComponentVisible = false; // Close the login component
  }

  logout() {
    this.authService.logout(); // Call the authentication service's logout method to log the user out
    this.loggedIn = false;
  }

  ngOnInit(): void {
  }
}
