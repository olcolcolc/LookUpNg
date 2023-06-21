import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from '../../services/auth.service';
import { isDescendantOfElement } from '../../utils/isDescedantOfElement';


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
  userEmail: string | null | undefined;
  loggedIn: boolean = false;

  constructor(private afAuth: AngularFireAuth, private authService: AuthService) {
    this.authService.loggedIn$.subscribe((loggedIn) => {
      this.loggedIn = loggedIn;
      if (loggedIn) {
        this.isLoginComponentVisible = false;
      }
    });
  }

  toggleLoginComponent(): void {
    this.isLoginComponentVisible = !this.isLoginComponentVisible;
  }

  logout() {
    this.authService.logout();
    this.loggedIn = false;
  }


//   @HostListener('document:click', ['$event'])
// onClick(event: MouseEvent) {
//   const targetElement = event.target as HTMLElement;

//   // Sprawdzenie czy kliknięcie nastąpiło poza formularzem logowania
//   if (!isDescendantOfElement(targetElement, 'loginComponent')) {
//     this.isLoginComponentVisible = false;
//   }
// }

  // @HostListener('document:click', ['$event'])
  // onClick(event: MouseEvent) {
  //   const targetElement = event.target as HTMLElement;

  //   // Sprawdzenie czy kliknięcie nastąpiło poza formularzem logowania
  //   if (!isDescendantOfElement(targetElement, 'loginComponent')) {
  //     // Tutaj dodaj kod, który będzie wykonywany, gdy kliknięcie nastąpi poza formularzem logowania
  //     // Na przykład, zamknięcie okna logowania
  //     this.isLoginComponentVisible = false;
  //   }
  // }

  ngOnInit(): void {
  }
}
