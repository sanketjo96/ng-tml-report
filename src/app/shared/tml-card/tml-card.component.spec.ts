import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmlCardComponent } from './tml-card.component';

describe('TmlCardComponent', () => {
  let component: TmlCardComponent;
  let fixture: ComponentFixture<TmlCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmlCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmlCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
