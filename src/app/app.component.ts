import { Component, NgZone } from '@angular/core';
import { App, Platform, ViewController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { AuthProvider } from "../providers/auth/auth";
import { AuthLoginPage } from "../pages/auth-login/auth-login";
import { CodePush, SyncStatus } from '@ionic-native/code-push';
import { UtilProvider } from "../providers/util/util";
import { CacheImageProvider } from "../providers/cache-image/cache-image";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(platform: Platform, statusBar: StatusBar, public zone: NgZone, splashScreen: SplashScreen,
              private authService: AuthProvider, private codePush: CodePush, private utilProvider: UtilProvider,
              private imgcacheService: CacheImageProvider, app: App) {
    platform.ready()
      .then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
        if (platform.is('cordova')) {
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

        this.authService.isAuthenticated().subscribe(user => {
          if (user) {
            imgcacheService.initImgCache();
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

    platform.registerBackButtonAction(() => {
      let nav = app.getActiveNav();
      let activeView: ViewController = nav.getActive();

      if (activeView != null) {
        if (nav.canGoBack()) {
          nav.pop();
        } else if (typeof activeView.instance.backButtonAction === 'function') {
          activeView.instance.backButtonAction();
        } else {
          nav.parent.select(0);
        }
      }
    });
  }
}
