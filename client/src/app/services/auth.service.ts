import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  currentId: any;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', email);
    body.set('password', password);

    this.isLoggedIn = true;
    if (email === 'admin@admin.com' && password === 'admin123') {
      this.isAdmin = true;
      this.isLoggedIn = true;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://172.100.0.10:5000/app/login', body, {headers: headers, withCredentials: true});
  }

  register(user: User) {
    const body = new URLSearchParams();
    body.set('email', user.email);
    body.set('name', user.name);
    body.set('password', user.password);

    this.isLoggedIn = true;

    if (user.email === 'admin@admin.com' && user.password === 'admin123') {
      this.isAdmin = true;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    return this.http.post('http://172.100.0.10:5000/app/register', body, {headers: headers});
  }


  logout() {
    this.isLoggedIn = false;
    this.isAdmin = false;
    return this.http.post('http://172.100.0.10:5000/app/logout', {}, {withCredentials: true, responseType: 'text'});
  }

  isLoggedInUser(){
    return this.isLoggedIn;
  }

  isAdminUser(){
    return this.isAdmin;
  }

  checkAuth() {
    return this.http.get<boolean>('http://172.100.0.10:5000/app/checkAuth', {withCredentials: true});
  }
}