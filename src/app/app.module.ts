import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { EmployeeAPIService } from './services/employee-api-service';
import { NgApexchartsModule } from 'ng-apexcharts'

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgApexchartsModule
  ],
  providers: [EmployeeAPIService],
  bootstrap: [AppComponent]
})
export class AppModule { }
