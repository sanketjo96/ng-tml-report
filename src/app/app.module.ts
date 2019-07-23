import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportModule } from './report/report.module';
import { PagenotfoundComponent } from './core/pagenotfound/pagenotfound.component';
import { GroupDetailsModule } from './group-details/group-details.module';
import { InferenceModalComponent } from './report/inference/inference.component';
import { LoginModule } from './login/login.module';
import { environment } from 'src/environments/environment';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}

@NgModule({
  declarations: [
    AppComponent,
    PagenotfoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: environment.whitelistedDomains,
        blacklistedRoutes: environment.blacklistedRoutes
      }
    }),
    MatToolbarModule,
    LoginModule,
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
