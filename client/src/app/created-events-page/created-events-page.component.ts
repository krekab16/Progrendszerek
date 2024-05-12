import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { EventService } from '../services/event.service';
import { Event } from '../model/event';
import { MatDialog } from '@angular/material/dialog';
import { EditEventModalComponent } from '../edit-event-modal/edit-event-modal.component';

@Component({
  selector: 'app-created-events-page',
  templateUrl: './created-events-page.component.html',
  styleUrl: './created-events-page.component.css'
})
export class CreatedEventsPageComponent {

  isAdmin: boolean = false;
  isLoggedIn: boolean = false;
  events!: Event[];
  isDeleted: boolean = false;
  isEditMode: boolean = false;
  


  constructor(
    private router: Router, 
    private authService: AuthService, 
    private eventService: EventService,
    public dialog: MatDialog
  ) { }
  
  navigateToCreateEventPage(){
    this.router.navigateByUrl('/createEventPage');
  }


  navigateToHomePage(){
    this.router.navigateByUrl('/homePage');
  }

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedInUser();
    this.isAdmin = this.authService.isAdminUser();
    this.getAllEvents();

  }

  deleteEvent(event: any) {
    let id = event._id;
    this.eventService.deleteEvent(id).subscribe({
      next: (data) => {
        this.events = [...this.events];
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

 openEditModal(event: Event): void {
  const dialogRef = this.dialog.open(EditEventModalComponent, {
    data: { ...event }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.eventService.updateEvent(result._id, result).subscribe({
        next: (data) => {
          console.log('Az esemény sikeresen módosítva lett.');
          console.log(result);
          this.reloadPage();
        },
        error: (err) => {
          console.error('Hiba történt az esemény módosítása közben:', err);
        }
      });
    }
  });
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
