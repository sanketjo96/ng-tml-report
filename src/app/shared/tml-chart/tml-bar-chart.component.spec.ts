import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TmlBarChartComponent } from './tml-bar-chart.component';

describe('TmlBarChartComponent', () => {
  let component: TmlBarChartComponent;
  let fixture: ComponentFixture<TmlBarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TmlBarChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TmlBarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
