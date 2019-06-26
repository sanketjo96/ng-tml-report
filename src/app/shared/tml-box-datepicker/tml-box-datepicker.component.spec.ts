import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmlBoxDatepickerComponent } from './tml-box-datepicker.component';

describe('TmlBoxDatepickerComponent', () => {
  let component: TmlBoxDatepickerComponent;
  let fixture: ComponentFixture<TmlBoxDatepickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmlBoxDatepickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmlBoxDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
