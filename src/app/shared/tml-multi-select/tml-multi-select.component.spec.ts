import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmlMultiSelectComponent } from './tml-multi-select.component';

describe('TmlMultiSelectComponent', () => {
  let component: TmlMultiSelectComponent;
  let fixture: ComponentFixture<TmlMultiSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmlMultiSelectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmlMultiSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
