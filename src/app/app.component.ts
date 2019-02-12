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
          // Call code push service. Check if there is an update, install if any
          this.codePush.sync({}, downloadProgress).subscribe((syncStatus: SyncStatus) => {
            // Print logs based on the status of Code Push
            if (syncStatus == 7) {
              this.utilProvider.presentToast('Downloading update package...');
            } else if (syncStatus == 8) {
              this.utilProvider.presentToast('Update installing...');
            } else if (syncStatus == 5) {
              this.utilProvider.presentToast('Checking for update...');
            }
          });
        }

        // Check if the user is authenticated by looking at the user state
        // The user is subscribed to to ensure that any subsequent changes to the user is handled appropriately.
        this.authService.isAuthenticated().subscribe(user => {
          if (user) {
            // Enable the caching service if user is authenticated
            imgcacheService.initImgCache();
            this.zone.run(() => {
              // Set root page to tabs
              this.rootPage = TabsPage;
            });
          } else {
            // User not authenticated, redirect to login
            this.rootPage = AuthLoginPage;
          }
        }, () => {
          // There was an error, default to login page
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
