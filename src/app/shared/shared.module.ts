import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { ChartsModule } from 'ng2-charts';

import { TmlTableComponent } from './tml-table/tml-table.component';
import { TmlMultiSelectComponent } from './tml-multi-select/tml-multi-select.component';
import { TmlBoxDatepickerComponent } from './tml-box-datepicker/tml-box-datepicker.component';
import { TmlBarChartComponent } from './tml-chart/tml-bar-chart.component';
import { MatNativeDateModule } from '@angular/material';
import { MaterialModule } from '../material/material.module';
import { TmlCompaintCardComponent } from './tml-card/tml-card.component';

@NgModule({
  declarations: [
    TmlTableComponent, 
    TmlMultiSelectComponent, 
    TmlBoxDatepickerComponent, 
    TmlBarChartComponent, 
    TmlCompaintCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    ChartsModule
  ],
  providers: [MatNativeDateModule],
  exports: [
    TmlTableComponent,
    TmlCompaintCardComponent,
    TmlMultiSelectComponent,
    TmlBoxDatepickerComponent,
    TmlBarChartComponent
  ]
})
export class SharedModule { }
