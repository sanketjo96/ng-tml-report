import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportModule } from './report/report.module';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { GroupDetailsModule } from './group-details/group-details.module';
import { InferenceModalComponent } from './report/inference/inference.component';

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    ReportModule,
    GroupDetailsModule,
    AppRoutingModule
  ],
  entryComponents: [
    InferenceModalComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
