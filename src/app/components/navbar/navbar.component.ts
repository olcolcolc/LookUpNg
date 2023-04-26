import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';


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


  public toggleLoginComponent(): void {
    this.isLoginComponentVisible = !this.isLoginComponentVisible;
  }

  constructor() { }

  ngOnInit(): void {

  }

}
