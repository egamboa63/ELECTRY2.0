import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from 'rxjs';
//AUTH SERVICE
import { AuthService } from "./services/auth.service";


@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  providers: [AuthService],
})
export class AppComponent {

  public user:any;  
  public emailuser = "";
  public islogged = false;

  constructor(private router: Router, private authSvc: AuthService) {
  }
  async ngOnInit() {
    
    this.user = await this.authSvc.getCurrentuser();
    if (this.user) {
      this.islogged = true;
      this.emailuser = (this.user).email;
    }
  }
  title = "ELECTRY";
  toLogin() {
    this.router.navigate(["/login"]);
  }
  toSingup() {
    this.router.navigate(["/singup"]);
  }
  async Logout() {
    try {
      await this.authSvc.logout();
      this.router.navigate(["/"]);
      this.islogged = false;
    } catch (error) {
      console.log(error);
    }
  }
}
