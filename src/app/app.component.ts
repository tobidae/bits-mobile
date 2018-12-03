import { Component, NgZone } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from "../providers/auth/auth";
import { AuthLoginPage } from "../pages/auth-login/auth-login";
import { CodePush } from '@ionic-native/code-push';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, public zone: NgZone, splashScreen: SplashScreen,
              private authService: AuthProvider, private codePush: CodePush) {
    platform.ready()
      .then(() => {
        if (platform.is('cordova')){
          const downloadProgress = (progress) => {
            console.log(`Downloaded ${progress.receivedBytes} of ${progress.totalBytes}`);
          };
          this.codePush.sync({}, downloadProgress).subscribe((syncStatus) => console.log(syncStatus));
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
