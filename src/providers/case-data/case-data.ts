import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";
import { AuthProvider } from "../auth/auth";

@Injectable()
export class CaseDataProvider {

  constructor(public http: HttpClient, private db: AngularFireDatabase, private authProvider: AuthProvider) {}


  getCases() {
    return this.db.object('/cases').valueChanges();
  }

  addCaseToCart(caseId) {
    const userId = this.authProvider.userID();
    return this.db.database.ref(`/caseCarts/${userId}/${caseId}`).set(true);
  }

  removeCaseFromCart(caseId) {
    const userId = this.authProvider.userID();
    return this.db.database.ref(`/caseCarts/${userId}/${caseId}`).remove();
  }

}
