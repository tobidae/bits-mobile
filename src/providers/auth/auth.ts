import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from "rxjs";

export interface User {
  email: string;
  password: string;
}

@Injectable()
export class AuthProvider {
  user: Observable<firebase.User>;
  userDetails: firebase.User = null;

  constructor(
    private afAuth: AngularFireAuth) {
    this.user = afAuth.authState;

    this.user.subscribe((user) => {
      if (user) {
        this.userDetails = user;
      } else {
        this.userDetails = null;
      }
    });
  }

  signInWithEmail(user: User) {
    return this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  registerWithEmail(user: User) {
    return this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
  }

  resetPassword(email: string) {
    return this.afAuth.auth.sendPasswordResetEmail(email);
  }

  newPassword(password) {
    let user = this.afAuth.auth.currentUser;
    return user.updatePassword(password);
  }

  newEmail(emailAddress) {
    let user = this.afAuth.auth.currentUser;
    return user.updateEmail(emailAddress);
  }

  signOut() {
    return this.afAuth.auth.signOut();
  }

  isAuthenticated() {
    return this.afAuth.authState;
  }

  sendEmailVerification() {
    let user = this.afAuth.auth.currentUser;
    if (user) {
      return user.sendEmailVerification();
    }
    return null;
  }

  isEmailVerified() {
    let user = this.afAuth.auth.currentUser;
    if (user) {
      return user.emailVerified;
    }
    return false;
  }

  userToken() {
    return this.afAuth.auth.currentUser.getIdToken()
      .then(token => {
        return token;
      }, err => {
        console.log(err);
      });
  }

  userID() {
    return this.afAuth.auth.currentUser.uid || null;
  }

  get userSub() {
    return this.user;
  }
}
