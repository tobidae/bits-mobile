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
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers = this.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT');
  }

  // Get the user's cart and subscribe to any changes made
  getUserCart() {
    const userId = this.authProvider.userID();
    return this.db.object(`/userCarts/${userId}`).valueChanges();
  }

  // Get the user's watch list of cases and subscribe to any changes
  getUserFav() {
    const userId = this.authProvider.userID();
    return this.db.object(`/userFavCarts/${userId}`).valueChanges();
  }

  // Get the user's cart and subscribe to any changes made
  getUserPastOrders() {
    const userId = this.authProvider.userID();
    return this.db.object(`/userPastOrders/${userId}`).valueChanges();
  }

  placeOrder() {
    // Get the user ID from the auth provider
    const userId = this.authProvider.userID();
    return new Promise((resolve, reject) => {
      // Get the user's token and send it to the server as an Auth header
      this.authProvider.userToken()
        .then(token => {
          if (token) {
            this.headers = this.headers.set('Authorization', `Bearer ${token}`);

            let projectId = firebaseConfig.projectId;

            // Build the url where the cloud server function is located
            // Pass in the userID and the headers with authorization
            this.http.post(`https://us-central1-${projectId}.cloudfunctions.net/placeCaseOrder`,
              JSON.stringify({
                userId: userId
              }), { headers: this.headers })
              .subscribe(data => {
                // After the function has been executed, a response is sent back
                // if the type of data is success, resolve else reject with error handling
                if (data['type'] == 'success') {
                  resolve(data);
                } else {
                  reject(data);
                }
              });
          }
        })
        .catch(err => {
          console.log(err);
          reject("You are unauthorized");
        });
    })
  }

  // Get the info of the user on the db like name, location, e.t.c
  getUserInfo() {
    const userId = this.authProvider.userID();
    return this.db.object(`/userInfo/${userId}`).valueChanges();
  }

  // Set the data of the user as they change it
  setUserInfo(data: any, path?: any) {
    const userId = this.authProvider.userID();
    if (path) {
      return this.db.database.ref(`/userInfo/${userId}/${path}`).update(data);
    }
    return this.db.database.ref(`/userInfo/${userId}`).update(data);
  }
}
