import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from "@angular/fire/database";

@Injectable()
export class CaseDataProvider {

  constructor(public http: HttpClient, private db: AngularFireDatabase) {
  }

  getCases() {
    return this.db.object('/cases').valueChanges();
  }

}
