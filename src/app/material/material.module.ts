import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatNativeDateModule,
  MatSelectModule, 
  MatDatepickerModule, 
  MatPaginatorModule, 
  MatSortModule, 
  MatTooltipModule, 
  MatTableModule, 
  MatButtonModule, 
  MatInputModule,
  MatDialogModule,
  MatSlideToggleModule,
  MatCardModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatExpansionModule
} from '@angular/material';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatExpansionModule
  ],
  exports: [
    MatInputModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatTooltipModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatCardModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatToolbarModule,
    MatExpansionModule
  ]
})
export class MaterialModule { }
