import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { AuthProvider } from "../auth/auth";

@Injectable()
export class UserDataProvider {

  constructor(public http: HttpClient, private db: AngularFireDatabase, private authProvider: AuthProvider) {

  }

  getUserCart() {
    const userId = this.authProvider.userID();
    return this.db.object(`/userCarts/${userId}`).valueChanges();
  }

  getUserFav() {
    const userId = this.authProvider.userID();
    return this.db.object(`/userFavCarts/${userId}`).valueChanges();
  }



}
