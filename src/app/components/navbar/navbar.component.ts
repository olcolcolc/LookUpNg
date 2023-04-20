import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  isLoginComponentVisible: boolean = true;

  public toggleLoginComponent():void {
    this.isLoginComponentVisible = !this.isLoginComponentVisible;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
