import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../providers/auth/auth";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";


@IonicPage()
@Component({
  selector: 'page-auth-forgot',
  templateUrl: 'auth-forgot.html',
})
export class AuthForgotPage {
  forgotForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider,
              private fb: FormBuilder) {
    this.forgotForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])]
    })
  }

  forgotPassword() {
    if (this)
    this.authProvider.registerWithEmail()
  }

}
