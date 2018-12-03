import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { TabsPage } from "../tabs/tabs";
import { AuthRegisterPage } from "../auth-register/auth-register";
import { AuthForgotPage } from "../auth-forgot/auth-forgot";

@IonicPage()
@Component({
  selector: 'page-auth-login',
  templateUrl: 'auth-login.html',
})
export class AuthLoginPage {

  loginForm: FormGroup;
  loginError: string;

  constructor(private navCtrl: NavController, private navParams: NavParams, private authProvider: AuthProvider,
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
        error => this.loginError = error.message
      );
  }

  register(){
    this.navCtrl.push(AuthRegisterPage);
  }

  forgotPassword() {
    this.navCtrl.push(AuthForgotPage);
  }

}
