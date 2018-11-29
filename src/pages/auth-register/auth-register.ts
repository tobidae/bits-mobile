import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../providers/auth/auth";
import { TabsPage } from "../tabs/tabs";



@IonicPage()
@Component({
  selector: 'page-auth-register',
  templateUrl: 'auth-register.html',
})
export class AuthRegisterPage {
  registerError: string;
  registerForm: FormGroup;

  constructor(
    fb: FormBuilder,
    private navCtrl: NavController,
    private authProvider: AuthProvider
  ) {
    this.registerForm = fb.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  register() {
    let data = this.registerForm.value;
    let credentials = {
      email: data.email,
      password: data.password
    };
    this.authProvider.registerWithEmail(credentials).then(
      () => this.navCtrl.setRoot(TabsPage),
      error => this.registerError = error.message
    );
  }

}
