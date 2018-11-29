import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner';

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  private isBackMode: boolean = true;
  private isFlashLightOn: boolean = false;
  private scanSub: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private qrScanner: QRScanner) {
  }

  ionViewWillEnter() {
    this.showCamera();
    this.initializeCamera().then(status => {
      console.log(status);
      if (status) {
        return this.scanCode();
      }
    })
  }

  ionViewWillLeave() {
    this.qrScanner.hide().catch(e => console.log('QRScanner hide', e)); // hide camera preview
    this.scanSub.unsubscribe(); // stop scanning
    this.hideCamera();
  }

  initializeCamera() {
    return this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // Camera was granted
          return Promise.resolve(true);
        } else if (status.denied) {
          return Promise.reject(status.denied);
          // Camera permission was permanently denied, can only grant permission in settings.
        } else {
          return Promise.reject(false);
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  /**
   * returns Promise with the QR text resolved
   */
  scanCode() {
    // start scanning
    return new Promise((resolve, reject) => {
      this.scanSub = this.qrScanner.scan().subscribe((text: string) => {
        this.qrScanner.hide().catch(e => reject({error: e, data: text})); // hide camera preview
        this.scanSub.unsubscribe(); // stop scanning
        resolve(text);
      });
    })

  }

  guideToGrantPermission() {
    this.qrScanner.openSettings();
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  hideCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }
}
