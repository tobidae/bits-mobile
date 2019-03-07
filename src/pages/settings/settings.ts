import { Component } from '@angular/core';
import { ActionSheetController, AlertController, IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AuthLoginPage } from "../auth-login/auth-login";
import { AuthProvider } from "../../providers/auth/auth";
import { CodePush, IRemotePackage, SyncStatus } from "@ionic-native/code-push";
import { UtilProvider } from "../../providers/util/util";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { factorySectors } from "../../shared/helpers";
import { FcmProvider } from "../../providers/fcm/fcm";

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  versionNumber: string;
  hasUpdate: boolean = false;

  userData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private authProvider: AuthProvider,
              private platform: Platform, private codePush: CodePush, private actionSheetCtrl: ActionSheetController,
              private utilProvider: UtilProvider, private alertCtrl: AlertController,
              private userDataProvider: UserDataProvider, private fcmProvider: FcmProvider) {
    if (platform.is('cordova')) {
      // Get the current app package which has the version
      // this.codePush.getCurrentPackage().then(pack => {
      //   this.versionNumber = pack.appVersion;
      // });
      // this.appVersion.getVersionNumber()
      //   .then(version => {
      //     this.versionNumber = version;
      //   });
    } else {
    }
    this.versionNumber = '1.0.0';
    this.userDataProvider.getUserInfo().subscribe(data => {
      this.userData = data;
    })
  }

  checkForUpdate() {
    this.codePush.checkForUpdate().then((remotePackage: IRemotePackage) => {
      if (remotePackage && remotePackage.appVersion !== this.versionNumber) {
        this.utilProvider.presentToast('A new version of the app is available');
        this.hasUpdate = true;
      }
    });
  }

  editUserProfile() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Edit Account Info',
      buttons: [{
        text: 'Change Display Name',
        icon: 'md-contact',
        handler: () => {
          this.editDisplayName();
        }
      },{
        text: 'Change Pickup Location',
        icon: 'md-pin',
        handler: () => {
          this.editPickupLocation();
        }
      }]
    });
    actionSheet.present();
  }

  editDisplayName() {
    let prompt = this.alertCtrl.create({
      title: "Enter name",
      inputs: [{
        name: 'displayName',
        placeholder: 'Your Name'
      }],
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Change',
        handler: data => {
          let displayName: string = data.displayName;
          if (displayName && displayName.length > 0) {
            this.userDataProvider.setUserInfo({
              displayName: displayName,
            }).then((res) => {
              this.utilProvider.presentToast("Successfully changed your name!");
            }, err => {
              console.log(err);
              this.utilProvider.presentToast("There was a problem trying to change your name!");
            })
          } else {
            this.utilProvider.presentToast("Something's wrong with the name!");
          }
        }
      }]
    });
    prompt.present();
  }

  editPickupLocation() {
    let prompt = this.alertCtrl.create({
      title: "Select location",
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Change',
        handler: data => {
          let sector: string = data;
          if (sector) {
            this.userDataProvider.setUserInfo({
              pickupLocation: sector,
            }).then((res) => {
              this.utilProvider.presentToast("Successfully changed your pickup location!");
            }, err => {
              console.log(err);
              this.utilProvider.presentToast("There was a problem trying to change your location!");
            })
          } else {
            this.utilProvider.presentToast("Something's wrong with the sector id!");
          }
        }
      }]
    });
    for (let i = 0; i < factorySectors.length; i++) {
      const sector = factorySectors[i].sectorId;
      prompt.addInput({
        type: 'radio',
        label: `Sector ${sector}`,
        value: sector,
        checked: this.userData && this.userData.pickupLocation == sector
      })
    }
    prompt.present();
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
        return this.fcmProvider.unregister();
      })
  }
}
