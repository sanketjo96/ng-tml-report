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

@NgModule({
  declarations: [
    TmlTableComponent, 
    TmlMultiSelectComponent, 
    TmlBoxDatepickerComponent, 
    TmlBarChartComponent
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
    TmlMultiSelectComponent,
    TmlBoxDatepickerComponent,
    TmlBarChartComponent
  ]
})
export class SharedModule { }
