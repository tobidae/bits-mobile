import { ToastController, LoadingController, Loading } from 'ionic-angular';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class UtilProvider {
  loading: Loading;

  constructor(
    private toastCtrl: ToastController,
    private loadingCtrl: LoadingController) { }

  presentToast(message) {
    return this.toastCtrl.create({
      message: message,
      duration: 3000,
      showCloseButton: true,
      dismissOnPageChange: true,
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
}
