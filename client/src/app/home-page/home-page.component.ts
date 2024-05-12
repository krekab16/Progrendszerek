import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { Event } from '../model/event';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.css'
})
export class HomePageComponent {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  events?: Event[];
  event?: Event;

  constructor(private router: Router, private authService: AuthService, private eventService: EventService) { }
  
  navigateToEventPage(eventId: string){
    this.router.navigateByUrl('/eventPage/' + eventId);
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


  navigateToCreateEventPage(){
    this.router.navigateByUrl('/createEventPage');
  }

  navigateToOrderPage(){
    this.router.navigateByUrl('/orderPage');
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedInUser();
    this.isAdmin = this.authService.isAdminUser();
    this.getAllEvents();
  }

  getAllEvents(){
    this.eventService.getAllEvent().subscribe({
      next: (data) => {
        this.events = data;
      }, error: (err) => {
        console.log(err);
      }
    });
  }

  getEvent(event: any){
    let id = event._id;
    this.eventService.getEvent(id).subscribe({
      next: (data) => {
        this.event = data;
        this.router.navigate(['/eventPage', id]);
        console.log(this.event);
      }, 
      error: (err) => {
        console.log(err);
      }
    });
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
