import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup,FormControl } from "@angular/forms";
import { AuthService } from 'src/app/services/auth.service';
import { AppComponent } from "../../app.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers:[AuthService]
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, private authSvc:AuthService, private appcomponetn:AppComponent) { }

  ngOnInit(): void {
  }
  /*ESTA MAL NO SIRVE*/
  toAdmin(){
    this.router.navigate(['/admin']);
  }
  onGoogleLogin(){
    try {
      this.authSvc.loginGoogle();
      this.router.navigate(['/']);
      
    } catch (error) {
      console.log(error);      
    }    
  }
  async onLogin(){
    const{email,password} = this.loginForm.value;
    try {
      const user = await this.authSvc.login(email,password);
      if (user) {
        this.router.navigate(['/']);
        this.appcomponetn.islogged = true;
      }
    } catch (error) {
      console.log(error);
      
    }
    
  }
}
