import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {StripePspComponent} from './stripe-psp/stripe-psp.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSliderModule} from "@angular/material/slider";
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {NgxStripeModule} from "ngx-stripe";
import {environment} from "../environments/environment";

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatSliderModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FlexLayoutModule,
    MatSelectModule,
    MatOptionModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    NgxStripeModule.forRoot(environment.stripePublicKey),
  ],
  declarations: [
    AppComponent,
    StripePspComponent
  ],

  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
