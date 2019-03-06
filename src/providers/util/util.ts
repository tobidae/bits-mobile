import { ToastController, LoadingController, Loading, Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Diagnostic } from '@ionic-native/diagnostic';

@Injectable()
export class UtilProvider {
  loading: Loading;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController,
    public _platform: Platform,
    public _diagnostic: Diagnostic) { }

  presentToast(message, duration=1500) {
    return this.toastCtrl.create({
      message: message,
      duration: duration,
      showCloseButton: true
    }).present();
  }

  initLoader(message) {
    return this.loadingCtrl.create({
      content: message,
      dismissOnPageChange: true
    });
  }

  presentLoader(caller?) {
    this.loading = this.loadingCtrl.create({
      content: caller ? caller : 'Please wait...',
      dismissOnPageChange: true
    });
    this.loading.present();
  }

  dismissLoader(data?) {
    if (this.loading) {
      this.loading.dismissAll();
      this.loading = null;
    }
  }

  isAndroid() {
    return this._platform.is('android')
  }

  isiOS() {
    return this._platform.is('ios');
  }

  isCordova() {
    return this._platform.is('cordova');
  }

  checkExternalStoragePermissions(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.isiOS()) {
        this._diagnostic.getExternalStorageAuthorizationStatus().then(status => {
          if (status == this._diagnostic.permissionStatus.GRANTED) {
            resolve(true);
          } else if (status == this._diagnostic.permissionStatus.DENIED) {
            resolve(false);
          } else if (status == this._diagnostic.permissionStatus.NOT_REQUESTED || status.toLowerCase() == 'not_determined') {
            this._diagnostic.requestExternalStorageAuthorization().then(authorisation => {
              resolve(authorisation == this._diagnostic.permissionStatus.GRANTED);
            });
          }
        });
      } else if (this.isAndroid()) {
        this._diagnostic.isExternalStorageAuthorized().then(authorised => {
          if (authorised) {
            resolve(true);
          } else {
            this._diagnostic.requestExternalStorageAuthorization().then(authorisation => {
              resolve(authorisation == this._diagnostic.permissionStatus.GRANTED);
            });
          }
        });
      } else {
        resolve(false);
      }
    });
  }

  checkCameraPermissions(): Promise<boolean> {
    return new Promise(resolve => {
      if (this.isiOS()) {
        this._diagnostic.getCameraAuthorizationStatus().then(status => {
          if (status == this._diagnostic.permissionStatus.GRANTED) {
            resolve(true);
          } else if (status == this._diagnostic.permissionStatus.DENIED) {
            resolve(false);
          } else if (status == this._diagnostic.permissionStatus.NOT_REQUESTED || status.toLowerCase() == 'not_determined') {
            this._diagnostic.requestCameraAuthorization().then(authorisation => {
              resolve(authorisation == this._diagnostic.permissionStatus.GRANTED);
            });
          }
        });
      } else if (this.isAndroid()) {
        this._diagnostic.isCameraAuthorized().then(authorised => {
          if (authorised) {
            resolve(true);
          } else {
            this._diagnostic.requestCameraAuthorization().then(authorisation => {
              resolve(authorisation == this._diagnostic.permissionStatus.GRANTED);
            });
          }
        });
      } else {
        resolve(false);
      }
    });
  }
}
