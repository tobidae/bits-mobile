import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { TabsPage } from "../tabs/tabs";
import { AuthForgotPage } from "../auth-forgot/auth-forgot";

@IonicPage()
@Component({
  selector: 'page-auth-login',
  templateUrl: 'auth-login.html',
})
export class AuthLoginPage {

  loginForm: FormGroup;
  loginError: string;

  constructor(private navCtrl: NavController, private authProvider: AuthProvider,
    fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  login() {
    let data = this.loginForm.value;

    if (!data.email) return;

    let credentials = {
      email: data.email,
      password: data.password
    };
    this.authProvider.signInWithEmail(credentials)
      .then(
        () => this.navCtrl.setRoot(TabsPage),
        error => {
          if (this.isJSON(error.message)) {
            return this.loginError = error['error'].message
          } else {
            this.loginError = error.message;
          }
        }
      );
  }

  register(){
    let data = this.loginForm.value;

    if (!data.email) return;

    let credentials = {
      email: data.email,
      password: data.password
    };
    this.authProvider.registerWithEmail(credentials).then(
      () => this.navCtrl.setRoot(TabsPage),
      error => this.loginError = error.message
    );
  }

  forgotPassword() {
    this.navCtrl.push(AuthForgotPage);
  }

  isJSON(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }

}
