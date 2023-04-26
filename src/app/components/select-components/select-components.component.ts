import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-select-components',
  templateUrl: './select-components.component.html',
  styleUrls: ['./select-components.component.scss']
})
export class SelectComponentsComponent implements OnInit {
  myForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.myForm = this.fb.group({
      selects: this.fb.group({
        select1: ['', Validators.required],
        select2: ['', Validators.required],
        select3: ['', Validators.required],
        select4: ['', Validators.required],
      }),
      date: ['', Validators.required],
    });
  }

  submitForm() {
    console.log(this.myForm.value);
  }
}
