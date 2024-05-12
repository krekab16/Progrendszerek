import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  email: string = '';
  password: string = '';
  errorMessage: string = '';
  isAdmin: boolean = false;


  constructor(private router: Router, private authService: AuthService) { }

  navigateToHomePage(){
    this.router.navigateByUrl('/homePage');
  }

  navigateToRegistration(){
    this.router.navigateByUrl('/registrationPage');
  }

  login() {
    if (this.email && this.password) {
      this.errorMessage = '';
      this.authService.login(this.email, this.password).subscribe({
        next: (data) => {
          if (data) {
            this.authService.currentId = data;
            console.log(this.authService.currentId);
            this.router.navigateByUrl('/homePage');
          }
        }, error: (err) => {
          console.log(err);
          this.errorMessage = 'Nem megfelelő email cím vagy jelszó.'
        },
      })
    } else {
      this.errorMessage = 'Kérem töltse ki a mezőket.';
    }
    
  }


}
