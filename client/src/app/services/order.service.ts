import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }


  addOrder(event: any, userId: any) {
    const body = new URLSearchParams();
    body.set('userId', userId);
    body.set('event', event);
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
  
    return this.http.post('http://localhost:3000/app/addOrder', body.toString(), {headers: headers});
  }


  getMyOrder(id: any) {
    console.log(id);
    return this.http.get<Event[]>('http://localhost:3000/app/getMyOrder?id=' + id);
  }


}
