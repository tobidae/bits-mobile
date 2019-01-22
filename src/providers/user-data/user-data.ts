import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { AuthProvider } from "../auth/auth";
import { firebaseConfig } from "../../config";

@Injectable()
export class UserDataProvider {
  headers: HttpHeaders;

  constructor(public http: HttpClient, private db: AngularFireDatabase, private authProvider: AuthProvider) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'application/json');
    this.headers.append('Access-Control-Allow-Origin', '*');
  }

  getUserCart() {
    const userId = this.authProvider.userID();
    return this.db.object(`/userCarts/${userId}`).valueChanges();
  }

  getUserFav() {
    const userId = this.authProvider.userID();
    return this.db.object(`/userFavCarts/${userId}`).valueChanges();
  }

  placeOrder() {
    const userId = this.authProvider.userID();
    return new Promise((resolve, reject) => {
      this.authProvider.userToken()
        .then(token => {
          if (token) {
            this.headers.set('Authorization', `Bearer ${token}`);

            let projectId = firebaseConfig.projectId;

            this.http.post('https://us-central1-' + projectId + '.cloudfunctions.net/placeCaseOrder',
              JSON.stringify({
                userId: userId
              }), { headers: this.headers })
              .subscribe(data => {
                resolve(data);
              });
          }
        })
        .catch(err => {
          console.log(err);
          reject("You are unauthorized");
        });
    })
  }



}
