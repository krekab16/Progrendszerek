import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-event-page',
  templateUrl: './create-event-page.component.html',
  styleUrl: './create-event-page.component.css'
})
export class CreateEventPageComponent {

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  createEventForm!: FormGroup;


  ticketCategories = [
    {  name: 'VIP' },
    {  name: 'Általános' },
    {  name: 'Kiemelt' }
  ];

  constructor(private router: Router,private formBuilder: FormBuilder, private authService: AuthService, private eventService: EventService) { }
  
  navigateToCreatedEventsPage(){
    this.router.navigateByUrl('/createdEventsPage');
  }

  navigateToHomePage(){
    this.router.navigateByUrl('/homePage');
  }

  navigateToEventPage(){
    this.router.navigateByUrl('/eventPage');
  }

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdminUser();
    this.isLoggedIn = this.authService.isLoggedInUser();
    this.createEvent();
  }

  createEvent(){
    this.createEventForm = this.formBuilder.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      ticketPrice: ['', Validators.required],
      date: ['', Validators.required],
      ticketNumber: ['', Validators.required],
      ticketCategory: ['', Validators.required],
      description: [''],
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
  
  onCreate() {
    if (this.createEventForm.valid) {
      this.eventService.createEvent(this.createEventForm.value).subscribe({
        next: (data) => {
          console.log(data);
          this.router.navigateByUrl('/createdEventsPage');
        }, error: (err) => {
          console.log(err);
        }
      });
    } else {
      console.log('Form is not valid.');
    }
  }

}
