import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { EventPageComponent } from './event-page/event-page.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { RegistrationPageComponent } from './registration-page/registration-page.component';
import { CreateEventPageComponent } from './create-event-page/create-event-page.component';
import { CreatedEventsPageComponent } from './created-events-page/created-events-page.component';
import { CartComponent } from './cart-page/cart.component';
import { OrdersPageComponent } from './orders-page/orders-page.component';

const routes: Routes = [

  { path: '', component: HomePageComponent },
  { path: 'eventPage/:id', component: EventPageComponent },
  { path: 'homePage', component: HomePageComponent },
  { path: 'loginPage', component: LoginPageComponent },
  { path: 'registrationPage', component: RegistrationPageComponent },
  { path: 'createEventPage', component: CreateEventPageComponent },
  { path: 'createdEventsPage', component: CreatedEventsPageComponent },
  { path: 'cartPage', component: CartComponent },
  { path: 'orderPage', component: OrdersPageComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
