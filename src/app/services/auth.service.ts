import { Injectable } from "@angular/core";
//FIRST
import { first } from "rxjs/operators";

//AUTH FIREBASE
import { auth } from "firebase/app";
import { AngularFireAuth, AngularFireAuthModule } from "@angular/fire/auth";
import { User } from "firebase";

@Injectable()
export class AuthService {
  public user: User;
  constructor(public afAuth: AngularFireAuth) {}

  async loginGoogle(){
    
    try {
      return this.afAuth.signInWithPopup(new auth.GoogleAuthProvider);      
    } catch (error) {
      console.log(error);      
    }
  }

  async login(email: string, password: string) {
    try {
      const result = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async register(email: string, password: string) {
    try {
      const result = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      return result;
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      await this.afAuth.signOut();
      //REDIRIGIR
    } catch (error) {
      console.log(error);
    }
  }
  getCurrentuser() {
    return this.afAuth.authState.pipe(first()).toPromise();
  }
}
