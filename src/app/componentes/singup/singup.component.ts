import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//FORMS
import { FormGroup,FormControl } from "@angular/forms";
//AUTH SERVICE
import { AuthService } from "../../services/auth.service";
import { AppComponent } from 'src/app/app.component';

@Component({
  selector: 'app-singup',
  templateUrl: './singup.component.html',
  styleUrls: ['./singup.component.scss'],
  providers:[AuthService]
})
export class SingupComponent implements OnInit {
  registerForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  constructor(private router: Router, private authSvc:AuthService, private appcomponetn:AppComponent) { }

  ngOnInit(): void {
  }
  toAdmin(){
    this.router.navigate(['/admin']);
  }
  async onRegister(){
    const{email,password} = this.registerForm.value;
    try {
      const user = await this.authSvc.register(email,password);
      if(user){
        this.authSvc.login(email,password);
        this.router.navigate(['/']);
        this.appcomponetn.islogged = true;
      }
    } catch (error) {
      console.log(error);      
    }
  }
}
