import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthLoginPage } from "../auth-login/auth-login";
import { AuthProvider } from "../../providers/auth/auth";
import { AppVersion } from "@ionic-native/app-version";
import { CodePush, IRemotePackage } from "@ionic-native/code-push";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  versionNumber: string;
  hasUpdate: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider,
              private appVersion: AppVersion, private platform: Platform, private codePush: CodePush,
              private utilProvider: UtilProvider) {
    if (platform.is('cordova')) {
      // Get the current app package which has the version
      this.codePush.getCurrentPackage().then(pack => {
        this.versionNumber = pack.appVersion;
      });
      // this.appVersion.getVersionNumber()
      //   .then(version => {
      //     this.versionNumber = version;
      //   });
    } else {
      this.versionNumber = '1.0.0';
    }
  }

  checkForUpdate() {
    this.codePush.checkForUpdate().then((remotePackage: IRemotePackage) => {
      if (remotePackage.appVersion !== this.versionNumber) {
        this.utilProvider.presentToast('A new version of the app is available');
      }
    });
  }

  logout() {
    this.authProvider.signOut()
      .then(res => {
        this.navCtrl.setRoot(AuthLoginPage);
      })
  }
}
