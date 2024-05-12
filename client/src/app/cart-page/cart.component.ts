import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Event } from '../model/event';
import { CartService } from '../services/cart.service';
import { OrderService } from '../services/order.service';
import { Cart } from '../model/cart';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent {

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
    private cartService: CartService,
    private orderService: OrderService,
  ) { }
  
  navigateToHomePage(){
    this.router.navigateByUrl('/homePage');
  }

  
  navigateToOrderPage(){
    this.router.navigateByUrl('/orderPage');
  }



  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedInUser();
    this.isAdmin = this.authService.isAdminUser();
    this.myEvents = [];
    this.getMyCart();

  }


  getMyCart() {
    const currentUserId = this.authService.currentId; 
    this.cartService.getMyCart(currentUserId).subscribe({
      next: (data) => {
        this.events = data;
    
        this.myEvents = [];
        this.totalPrice = 0; 
  
        this.events.forEach(cartItem => {
          if (cartItem.userId === currentUserId) {
            const eventToAdd = {
              ...cartItem.event,
              addedByCurrentUser: true 
            };
            this.myEvents.push(eventToAdd);
            this.totalPrice += eventToAdd.ticketPrice; 
          }
        });
  
        console.log("Az összeg: " + this.totalPrice);
      }, 
      error: (err) => {
        console.log(err);
      }
    });
  }




  addOrder(events: any[]) {
    if (this.authService.isLoggedInUser()) { 
      events.forEach(event => {
        console.log(event._id);
        this.orderService.addOrder(event._id, this.authService.currentId).subscribe({
          next: (data) => {
            this.router.navigateByUrl('/orderPage');
          },
          error: (err) => {
            console.log(err);
          }
        }); 
      });
    } else {
      this.router.navigateByUrl('/loginPage');
    }
  }
  
  
  
  deleteFromCart(event: any){
    let id = event._id;
    this.cartService.deleteFromCart(id).subscribe({
      next: (data) => {
        this.myEvents = this.myEvents.filter(item => item._id !== id);
  
        this.isDeleted = true;
        setTimeout(() => {
          this.isDeleted = false;
          this.reloadPage();
        }, 3000);
        console.log(data);
      }, error: (err) => {
        this.isDeleted = false;
        console.log(err);
      }
    });
  }


  reloadPage() {
    window.location.reload();
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


}
