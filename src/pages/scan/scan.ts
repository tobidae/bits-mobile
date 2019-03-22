import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { Case, PastOrder } from "../../shared/interfaces";
import { CheckoutPage } from "../checkout/checkout";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { objToArr } from "../../shared/helpers";

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
              private utilProvider: UtilProvider, private caseDataProvider: CaseDataProvider,
              private userDataProvider: UserDataProvider) {
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

  async pickupCase() {
    let pastOrders: any = await this.userDataProvider.getUserPastOrders().take(1).toPromise();
    pastOrders = objToArr(pastOrders);
    let caseKey = this.caseData.caseId;
    let pickedUpPastOrder = false;
    let isStillTransporting = false;
    let isCompletedByKart = false;

    // Start from reverse because most recent order is there
    for (let i = pastOrders.length-1; i >= 0; i--) {
      const pastOrder: PastOrder = pastOrders[i];
      console.log(pastOrder);

      // If the order case id matches the scanned case key, the order has been completed by kart
      // And the order has not yet been scanned by the user, this is the order to complete
      if (pastOrder.caseId == caseKey) {
        if (pastOrder.completedByKart && !pastOrder.scannedByUser) {
          this.userDataProvider.updateUserPastOrder(pastOrder.$key, {
            scannedByUser: true
          });
          pickedUpPastOrder = true;
        }
        if (pastOrder.isTransporting) {
          isStillTransporting = true;
        }
        if (pastOrder.isTransporting && pastOrder.completedByKart) {
          isCompletedByKart = true;
        }
        break;
      }
    }
    if (pickedUpPastOrder) {
      this.utilProvider.presentToast('Your order has been picked up, thanks for using BITS', 5000)
        .then(() => {
          this.caseData = null;
        });
    } else if (isStillTransporting && !isCompletedByKart) {
      this.utilProvider.presentToast('Impossible! Your order is still on the way, hang tight', 4000);
    } else {
      this.utilProvider.presentToast('It looks like you did not checkout this item.' +
        ' Check it out and try again!', 4000);
    }
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
