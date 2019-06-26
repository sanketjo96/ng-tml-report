import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmlTableComponent } from './tml-table/tml-table.component';
import { MatPaginatorModule, MatSortModule, MatTooltipModule, MatTableModule, MatButtonModule } from '@angular/material';
import { TmlMultiSelectComponent } from './tml-multi-select/tml-multi-select.component';
import {MatSelectModule} from '@angular/material/select';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  declarations: [TmlTableComponent, TmlMultiSelectComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule
  ],
  exports: [TmlTableComponent, TmlMultiSelectComponent]
})
export class SharedModule { }
