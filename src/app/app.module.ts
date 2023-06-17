import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './components/main/main.component';
import { SelectComponent } from './components/select/select.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { DestinationService } from './services/destination.service';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SummaryComponent } from './components/summary/summary.component';
import { SummaryService } from './services/summary.service';
import { CurrencyConversionPipe } from './pipes/currency-conversion.pipe';
import { SkyscannerService } from './services/skyscanner.service';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    MainComponent,
    SelectComponent,
    SummaryComponent,
    CurrencyConversionPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [DestinationService, SummaryService, SkyscannerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
