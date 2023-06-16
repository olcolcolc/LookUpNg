import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showSelect: boolean = true;

  onSubmit() {
    this.showSelect = false;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
