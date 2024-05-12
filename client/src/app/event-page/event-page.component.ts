import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Event } from '../model/event';
import { EventService } from '../services/event.service';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrl: './event-page.component.css'
})
export class EventPageComponent {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  actualEvent: Event;
  id: string | null;
  isAdded: boolean = false;

  constructor(private router: Router, 
    private authService: AuthService, 
    private activeedRoot:ActivatedRoute, 
    private eventService: EventService,
    private cartService: CartService
  ) { }
  
  navigateToHomePage(){
    this.router.navigateByUrl('/homePage');
  }

  navigateToLoginPage(){
    this.router.navigateByUrl('/loginPage');
  }

  navigateToCartPage(){
    this.router.navigateByUrl('/cartPage');
  }

  navigateToCreatedEventsPage(){
    this.router.navigateByUrl('/createdEventsPage');
  }

  navigateToOrderPage(){
    this.router.navigateByUrl('/orderPage');
  }

  navigateToCreateEventPage(){
    this.router.navigateByUrl('/createEventPage');
  }


  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedInUser();
    this.isAdmin = this.authService.isAdminUser();
    this.id = this.activeedRoot.snapshot.paramMap.get('id');
    this.getActualEvent();
  }


  getActualEvent() {
    if (this.id) {
      this.eventService.getEvent(this.id).subscribe({
        next: (eventData) => {
          this.actualEvent = eventData; 
        },
        error: (err) => {
          console.error('Error fetching event data:', err);
        }
      });
    }
  }

  addToCart(event: any) {
    let id = event._id;
    if (this.authService.isLoggedInUser()) { 
      console.log(id);
      this.cartService.addToCart(id, this.authService.currentId ).subscribe({
        next: (data) => {
          this.isAdded = true;
        setTimeout(() => {
        this.isAdded = false;
      }, 3000);
        }, error: (err) => {
          console.log(err);
        }

      }); 
    } else {
      this.router.navigateByUrl('/loginPage');
    }
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
