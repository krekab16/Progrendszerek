import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { EventPageModule } from './event-page/event-page.module';
import { HomePageModule } from './home-page/home-page.module';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CreateEventPageComponent } from './create-event-page/create-event-page.component';
import { CreatedEventsPageComponent } from './created-events-page/created-events-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CartComponent } from './cart-page/cart.component';
import { EditEventModalComponent } from './edit-event-modal/edit-event-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OrdersPageComponent } from './orders-page/orders-page.component';


@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    EventPageComponent,
    RegistrationPageComponent,
    LoginPageComponent,
    CreateEventPageComponent,
    CreatedEventsPageComponent,
    CartComponent,
    EditEventModalComponent,
    OrdersPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    EventPageModule,
    HomePageModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserAnimationsModule 
  ],
  providers: [
    provideClientHydration(),
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
