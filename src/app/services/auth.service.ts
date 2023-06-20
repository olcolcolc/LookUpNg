import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public loggedIn$ = this.loggedInSubject.asObservable();

  constructor(private afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe((user) => {
      if (user) {
        this.loggedInSubject.next(true);
      } else {
        this.loggedInSubject.next(false);
      }
    });
  }

  login(email: string, password: string): Promise<void>  {
    return this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Login successful');
        this.loggedInSubject.next(true);
      })
      .catch((error) => {
        console.log('Login error: ', error);
        this.loggedInSubject.next(false);
      });
  }

  signup(email: string, password: string): Promise<void> {
    return this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Signup successful');
        this.loggedInSubject.next(true);
      })
      .catch((error) => {
        console.log('Signup error: ', error);
      });
  }


  logout(): Promise<void> {
    return this.afAuth.signOut().then(() => {
      console.log('Logout successful');
      this.loggedInSubject.next(false);
    }).catch((error) => {
      console.log('Logout error: ', error);
    });
  }

}
