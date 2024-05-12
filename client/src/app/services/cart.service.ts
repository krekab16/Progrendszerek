import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }


  addToCart(event: any, userId: any) {

    const body = new URLSearchParams();
    body.set('event', event);
    body.set('userId', userId);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://localhost:3000/app/addToCart', body, {headers: headers});
   
  }

  deleteFromCart(id: string) {
    console.log(id);
    return this.http.delete('http://localhost:3000/app/deleteFromCart?id=' + id, {withCredentials: true});
  }

 

  getMyCart(id: any) {
    console.log(id);
    return this.http.get<Event[]>('http://localhost:3000/app/getMyCart?id=' + id);
  }

}
