import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AuthLoginPage } from "../auth-login/auth-login";
import { AuthProvider } from "../../providers/auth/auth";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider) {
  }

  logout() {
    this.authProvider.signOut()
      .then(res => {
        this.navCtrl.setRoot(AuthLoginPage);
      })
  }
}
