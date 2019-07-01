import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportRoutingModule } from './report-routing.module';
import { ReportComponent } from './report.component';
import { SharedModule } from '../shared/shared.module';
import { TablesComponent } from './tables/tables.component';
import { SearchComponent } from './search/search.component';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ChartsComponent } from './charts/charts.component';
import { InferenceModalComponent } from './inference/inference.component';
import { MatDialogModule } from '@angular/material/dialog';

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
    MatDialogModule,
    ReactiveFormsModule,
    SharedModule,
    MatSlideToggleModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    SharedModule,
    ReportRoutingModule
  ],
})
export class ReportModule { }
