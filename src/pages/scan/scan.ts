import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { Case } from "../../shared/interfaces";
import { CheckoutPage } from "../checkout/checkout";

class QRScan {
  app: string;
  caseId: string;
}

@IonicPage()
@Component({
  selector: 'page-scan',
  templateUrl: 'scan.html',
})
export class ScanPage {
  private scannedData: QRScan;
  caseData: Case;

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private modalCtrl: ModalController,
              private utilProvider: UtilProvider, private caseDataProvider: CaseDataProvider) {
  }

  /**
   * returns Promise with the QR text resolved
   */
  scanCode() {
    // start scanning
    return this.barcodeScanner.scan({formats: 'QR_CODE'})
      .then(result => {
        if (this.isJsonString(result.text)) {
          this.scannedData = JSON.parse(result.text);
          this.getCaseData();
        } else {
          this.caseData = null;
          this.utilProvider.presentToast('Unrecognized QR code format');
        }
      })
      .catch(error => {
        this.caseData = null;
        this.utilProvider.presentToast(error);
      });

  }

  getCaseData() {
    // Check if the app the QR came from is
    if (this.scannedData.app && this.scannedData.app == 'BITS') {
      this.caseDataProvider.getCaseById(this.scannedData.caseId)
        .subscribe((caseData: Case) => {
          caseData['caseId'] = this.scannedData.caseId;
          if (caseData.tags) {
            caseData.tagsArr = caseData.tags.split(',');
          }
          this.caseData = caseData;
        })
    } else {
      this.caseData = null;
      this.utilProvider.presentToast('Unrecognized QR code format');
    }
  }

  checkoutCase() {
    return this.caseDataProvider.addCaseToCart(this.caseData['caseId'])
      .then(() => this.utilProvider.presentToast(`Added ${this.caseData.name} to cart`),
        () => this.utilProvider.presentToast(`Error adding ${this.caseData.name} to cart`))
      .then(() => {
        const modal = this.modalCtrl.create(CheckoutPage);

        modal.onDidDismiss(data => {
          if (data && data.ordered) this.utilProvider.presentToast('Your order has been processed');
          else this.utilProvider.presentToast('Your order was not completed');
        });
        modal.present();
      });

  }

  isJsonString(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
}
