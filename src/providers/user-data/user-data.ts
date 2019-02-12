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
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
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
    // Get the user ID from the auth provider
    const userId = this.authProvider.userID();
    return new Promise((resolve, reject) => {
      // Get the user's token and send it to the server as an Auth header
      this.authProvider.userToken()
        .then(token => {
          if (token) {
            this.headers = this.headers.append('Authorization', `Bearer ${token}`);

            let projectId = firebaseConfig.projectId;

            // Build the url where the cloud server function is located
            // Pass in the userID and the headers with authorization
            this.http.post('https://us-central1-' + projectId + '.cloudfunctions.net/placeCaseOrder',
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

  getUserInfo() {
    const userId = this.authProvider.userID();
    return this.db.object(`/userInfo/${userId}`).valueChanges();
  }

  setUserInfo(data: any, path?: any) {
    const userId = this.authProvider.userID();
    if (path) {
      return this.db.database.ref(`/userInfo/${userId}/${path}`).update(data);
    }
    return this.db.database.ref(`/userInfo/${userId}`).update(data);
  }
}
