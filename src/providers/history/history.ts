import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { AuthProvider } from "../auth/auth";

@Injectable()
export class HistoryProvider {
  headers: HttpHeaders;

  constructor(public http: HttpClient, private db: AngularFireDatabase, private authProvider: AuthProvider) {
    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Content-Type', 'application/json');
    this.headers = this.headers.append('Access-Control-Allow-Origin', '*');
  }

  getUserHistory() {
    const userId = this.authProvider.userID();
    return this.db.object(`userHistory/${userId}`).valueChanges();
  }

}
