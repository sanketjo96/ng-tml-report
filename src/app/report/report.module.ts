import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { SharedModule } from '../shared/shared.module';
import { TablesComponent } from './tables/tables.component';
import { SearchComponent } from './search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartsComponent } from './charts/charts.component';
import { InferenceModalComponent } from './inference/inference.component';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ReportComponent,
    SearchComponent,
    TablesComponent,
    ChartsComponent,
    InferenceModalComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    MaterialModule,
    SharedModule,
    ReportRoutingModule
  ],
})
export class ReportModule { }
