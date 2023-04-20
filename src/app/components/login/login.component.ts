import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginContainerOpen: boolean = false

  loginForm = new FormGroup({
    email: new FormControl("Podaj e-mail", {
      validators:[
        Validators.required,
        Validators.email,
        Validators.maxLength(8)
      ],
      updateOn:"blur"
    }),
    password: new FormControl("Podaj hasło", {
      validators:[
        Validators.required,
        Validators.minLength(8),
        Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$')
      ]
    })
  });

  constructor() { }

  ngOnInit(): void {}

  //TODO: żeby animacja wysuwanego okna dzialala z powrotem

  submitLogin() {
    console.log(this.loginForm.value);
  }
}
