import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectComponentsComponent } from './select.component';

describe('SelectComponentsComponent', () => {
  let component: SelectComponentsComponent;
  let fixture: ComponentFixture<SelectComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectComponentsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
