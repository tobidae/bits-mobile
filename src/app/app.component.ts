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
import { UserDataProvider } from "../providers/user-data/user-data";
import { FcmProvider } from "../providers/fcm/fcm";
import { tap } from "rxjs/operators";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  constructor(private platform: Platform, statusBar: StatusBar, private zone: NgZone, splashScreen: SplashScreen,
              private authService: AuthProvider, private codePush: CodePush, private utilProvider: UtilProvider,
              private imgcacheService: CacheImageProvider, private app: App, private fcmProvider: FcmProvider,
              private userDataProvider: UserDataProvider) {
    // Wait for the app to load fully
    platform.ready()
      .then(() => {
        this.authSetup();

        statusBar.styleDefault();
        splashScreen.hide();

        if (platform.is('cordova')) {
          // this.syncApp();
          this.notificationSetup();
        }
      });

    this.registerBackButton();
  }

  authSetup() {
    // Check if the user is authenticated by looking at the user state
    // The user is subscribed to to ensure that any subsequent changes
    // to the user is handled appropriately.
    this.authService.isAuthenticated().subscribe(user => {
      if (user) {
        // Enable the caching service if user is authenticated
        this.imgcacheService.initImgCache();
        this.zone.run(() => {
          this.rootPage = TabsPage; // Set root page to tabs
        });
      } else {
        this.rootPage = AuthLoginPage; // User not authenticated, redirect to login
      }
    }, () => {
      this.rootPage = AuthLoginPage; // There was an error, default to login page
    });
  }

  notificationSetup() {
    // Get the user's current messaging token
    try {
      this.fcmProvider.getToken();
      this.fcmProvider.onNotifications().pipe(
        tap(msg => {
          if (this.platform.is('ios')) {
            this.utilProvider.presentToast(msg.aps.alert, 3500);
          } else {
            if (msg.body) {
              this.utilProvider.presentToast(msg.body, 4500);
            } else if (msg.title) {
              this.utilProvider.presentToast(msg.title, 4500);
            }
          }
        }))
        .subscribe();
    } catch (error) {
      console.error("FCM Error:", error);
    }
  }

  registerBackButton() {
    this.platform.registerBackButtonAction(() => {
      let nav = this.app.getActiveNav();
      let activeView: ViewController = nav.getActive();

      if (activeView != null) {
        if (nav.canGoBack()) {
          nav.pop();
        } else if (typeof activeView.instance.backButtonAction === 'function') {
          activeView.instance.backButtonAction();
        } else {
          this.platform.exitApp();
        }
      }
    });
  }

  syncApp() {
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
}
