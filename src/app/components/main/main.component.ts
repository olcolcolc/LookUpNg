import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  showSummary: boolean = false;

  onSubmit() {
    this.showSummary = true;
  }

  constructor() { }

  ngOnInit(): void {
  }

}
