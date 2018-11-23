import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the AuthGuardProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthGuardProvider {

  constructor(public http: HttpClient) {
    console.log('Hello AuthGuardProvider Provider');
  }

}
