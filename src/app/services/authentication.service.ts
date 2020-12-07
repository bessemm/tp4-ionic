import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

const TOKEN_KEY = 'my-token';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token: any;

  constructor(private angularFireAuth: AngularFireAuth) { }
  user() {
    return this.angularFireAuth.user;
  }
  login(value) {
    return new Promise<any>((resolve, reject) => {
      this.angularFireAuth.signInWithEmailAndPassword(value.email, value.password)
        .then(

          res => {
            this.isAuthenticated.next(true);
            this.token = res;
            return resolve(res);
          },
          err => {
            this.isAuthenticated.next(false);
            return reject(err);
          })
    })
  }
  register(value) {
    return new Promise<any>((resolve, reject) => {

      this.angularFireAuth.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })

  }



  logout() {
    return new Promise((resolve, reject) => {
      if (this.angularFireAuth.currentUser) {
        this.angularFireAuth.signOut()
          .then(() => {
            this.isAuthenticated.next(false);
            console.log("LOG Out");
            resolve();
          }).catch((error) => {
            reject();
          });
      }
    })
  }


}