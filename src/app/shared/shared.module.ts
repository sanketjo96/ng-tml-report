import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TmlTableComponent } from './tml-table/tml-table.component';
import { MatPaginatorModule, MatSortModule, MatTooltipModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [TmlTableComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule
  ],
  exports: [TmlTableComponent]
})
export class SharedModule { }
