import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthLoginPage } from "../auth-login/auth-login";
import { AuthProvider } from "../../providers/auth/auth";
import { CodePush, IRemotePackage, SyncStatus } from "@ionic-native/code-push";
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
              private platform: Platform, private codePush: CodePush,
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
      if (remotePackage && remotePackage.appVersion !== this.versionNumber) {
        this.utilProvider.presentToast('A new version of the app is available');
        this.hasUpdate = true;
      }
    });
  }

  downloadUpdate() {
    const downloadProgress = (progress) => {
      console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`);
    };
    this.codePush.sync({}, downloadProgress).subscribe((syncStatus: SyncStatus) => {
      if (syncStatus == 7) {
        this.utilProvider.presentToast('Downloading update package...');
      } else if (syncStatus == 8) {
        this.utilProvider.presentToast('Update installing...');
      } else if (syncStatus == 5) {
        this.utilProvider.presentToast('Checking for update...');
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
