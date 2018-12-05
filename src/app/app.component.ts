import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from "../providers/auth/auth";
import { AuthLoginPage } from "../pages/auth-login/auth-login";
import { CodePush, SyncStatus } from '@ionic-native/code-push';
import { UtilProvider } from "../providers/util/util";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, public zone: NgZone, splashScreen: SplashScreen,
              private authService: AuthProvider, private codePush: CodePush, private utilProvider: UtilProvider) {
    platform.ready()
      .then(() => {
        if (platform.is('cordova')) {
          const downloadProgress = (progress) => {
            console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`);
          };
          // this.codePush.sync({}, downloadProgress).subscribe((syncStatus: SyncStatus) => {
          //   if (syncStatus == 2) {
          //     this.utilProvider.presentToast('Update downloaded, please restart app');
          //   } else if (syncStatus == 7) {
          //     this.utilProvider.presentToast('Update found, installing...');
          //   }
          // });
        }

        this.authService.isAuthenticated().subscribe(user => {
          statusBar.styleDefault();
          splashScreen.hide();

          if (user) {
            this.zone.run(() => {
              this.rootPage = TabsPage;
            });
          } else {
            this.rootPage = AuthLoginPage;
          }
        }, () => {
          this.rootPage = AuthLoginPage;
        });
      });
  }
}
