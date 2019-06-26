import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatPaginatorModule, MatSortModule, MatTooltipModule, MatTableModule, MatButtonModule, MatInputModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material';
import {MatSelectModule} from '@angular/material/select';

import { TmlTableComponent } from './tml-table/tml-table.component';
import { TmlMultiSelectComponent } from './tml-multi-select/tml-multi-select.component';
import { TmlBoxDatepickerComponent } from './tml-box-datepicker/tml-box-datepicker.component';

@NgModule({
  declarations: [TmlTableComponent, TmlMultiSelectComponent, TmlBoxDatepickerComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule
  ],
  providers: [MatNativeDateModule],
  exports: [TmlTableComponent, TmlMultiSelectComponent, TmlBoxDatepickerComponent]
})
export class SharedModule { }
