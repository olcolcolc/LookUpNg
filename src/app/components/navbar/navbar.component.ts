import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map } from 'rxjs';
import { Output, EventEmitter } from '@angular/core';




@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [trigger('fadeInOut',[
    state('open', style({
      opacity: 1,
    })
    ),
    state('close', style({
      opacity:0
    })
    ),
    transition('open => close', [animate('0.5s ease-out')]),
    transition('close => open', [animate('0.5s ease-in')]),
  ])]
})
export class NavbarComponent implements OnInit {

  public isLoginComponentVisible: boolean = false;
  // isLoggedIn$: any;
  userEmail: string | null | undefined;
  loggedIn: boolean = false;



  public toggleLoginComponent(): void {
    this.isLoginComponentVisible = !this.isLoginComponentVisible;

  }

  // @Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();



  constructor(private afAuth: AngularFireAuth) {
    // this.isLoggedIn$ = this.afAuth.authState.pipe(map((user: any) => !!user));



    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.userEmail = user.email;
        this.loggedIn = true;
        this.isLoginComponentVisible = false; // Ukryj komponent logowania, jeśli użytkownik jest zalogowany
      } else {
        this.userEmail = null;
        this.loggedIn = false;
      }
    });
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        console.log('Logout successful');
      })
      .catch((error) => {
        console.log('Logout error: ', error);
      });
  }

  ngOnInit(): void {

  }

}
