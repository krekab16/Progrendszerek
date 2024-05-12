import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-orders-page',
  templateUrl: './orders-page.component.html',
  styleUrl: './orders-page.component.css'
})
export class OrdersPageComponent {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  events?: any[];
  myEvents: any[];
  isAdded: boolean = false;
  isDeleted: boolean = false;
  totalPrice: number = 0;

  constructor(
    private router: Router, 
    private authService: AuthService, 
    private orderService: OrderService
  ) { }


  ngOnInit(){
    this.isLoggedIn = this.authService.isLoggedInUser();
    this.isAdmin = this.authService.isAdminUser();
    this.getMyOrder();
  }


  navigateToHomePage(){
    this.router.navigateByUrl('/homePage');
  }


  navigateToCartPage(){
    this.router.navigateByUrl('/cartPage');
  }

  logout() {
    this.authService.logout().subscribe({
      next: (data) => {
        console.log(data);
        this.router.navigateByUrl('/loginPage');
      }, error: (err) => {
        console.log(err);
      }
    })
  }


  getMyOrder() {
    const currentUserId = this.authService.currentId; 
    this.orderService.getMyOrder(currentUserId).subscribe({
      next: (data) => {
        this.events = data;
  
        this.myEvents = [];
        this.totalPrice = 0; 
  
        this.events.forEach(cartItem => {
          if (cartItem.userId === currentUserId) {
            const event = cartItem.event[0];
  
            const eventToAdd = {
              _id: event._id,
              name: event.name,
              ticketPrice: event.ticketPrice,
              addedByCurrentUser: true 
            };
  
            this.myEvents.push(eventToAdd);
  
            this.totalPrice += eventToAdd.ticketPrice; 
  
            console.log(this.events);
          }
        });
      }, 
      error: (err) => {
        console.log(err);
      }
    });
  }


}
