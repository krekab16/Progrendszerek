import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Event } from '../model/event';

@Injectable({
  providedIn: 'root'
})
export class EventService {


  constructor(private http: HttpClient) { }


  createEvent(event: Event){

    const body = new URLSearchParams();
    body.set('name', event.name);
    body.set('date', event.date.toString());
    body.set('location', event.location);
    body.set('description', event.description);
    body.set('ticketCategory', event.ticketCategory);
    body.set('ticketNumber', event.ticketNumber.toString());
    body.set('ticketPrice', event.ticketPrice.toString());


    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:3000/app/createEvent', body, {headers: headers});

  }

  getAllEvent() {
    return this.http.get<Event[]>('http://localhost:3000/app/getAllEvents');
  }

  getEvent(id: string) {
    console.log(id);
    return this.http.get<Event>('http://localhost:3000/app/getEventById?id=' + id);
  }

  deleteEvent(id: string) {
    return this.http.delete('http://localhost:3000/app/deleteEvent?id=' + id, {withCredentials: true});
  }
  
  updateEvent(id: string, eventData: any) {
    const body = new URLSearchParams();
    body.set('name', eventData.name);
    body.set('date', eventData.date.toString());
    body.set('location', eventData.location);
    body.set('description', eventData.description);
    body.set('ticketCategory', eventData.ticketCategory);
    body.set('ticketNumber', eventData.ticketNumber.toString());
    body.set('ticketPrice', eventData.ticketPrice.toString());


    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    console.log(eventData);
    return this.http.put<Event>(`http://localhost:3000/app/updateEvent?id=${id}`, body, {headers: headers});
  }

}
