import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UtilProvider } from "../../providers/util/util";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { Case } from "../../shared/interfaces";
import { InAppBrowser } from '@ionic-native/in-app-browser';

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
  caseData: Case = {
    category: "Electronics",
    color: "gray",
    datasheetUrl: "https://www.valuetronics.com/pub/media/vti/datasheets/Agilent%208590%20E-Series.pdf",
    description: "A spectrum analyzer measures the power of spectrums of known and unknown signals. Spectrum analyzers collect information such as the magnitude of an input signal compared to its frequency. As a frequency analyzer spectrum analyzers main use is to document and analyze electrical input signals as well as spectral compositions of other signals.",
    imageUrl: "https://storage.googleapis.com/case-manager-boeing.appspot.com/inventory-images/spectrum-analyzer.jpg",
    isAvailable: true,
    lastLocation: "B3",
    mass: 14,
    maxHoldTime: 6,
    name: "Spectrum Analyzer",
    rfid: "934e88e1-21b1-4fce-bafc-03b220f9d43f",
    tags: "Needs Maintenance"
  };

  constructor(public navCtrl: NavController, private barcodeScanner: BarcodeScanner, private iab: InAppBrowser,
              private utilProvider: UtilProvider, private caseDataProvider: CaseDataProvider) {
  }

  /**
   * returns Promise with the QR text resolved
   */
  scanCode() {
    // start scanning
    return this.barcodeScanner.scan({formats: 'QR_CODE'})
      .then(result => {
        console.log(this.isJsonString(result.text));
        if (this.isJsonString(result.text)) {
          this.scannedData = JSON.parse(result.text);
          console.log(this.scannedData);
          this.getCaseData();
        }
      })
      .catch(error => {
        this.utilProvider.presentToast(error);
      });

  }

  getCaseData() {
    // Check if the app the QR came from is
    if (this.scannedData.app == 'BITS') {
      this.caseDataProvider.getCaseById(this.scannedData.caseId)
        .subscribe((caseData: Case) => {
          console.log(caseData);
          this.caseData = caseData;
        })
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

  checkoutCase() {
  }

  returnCase() {
    this.utilProvider.presentToast('Will update case location in future');
  }

  openDatasheet() {
    this.iab.create(this.caseData.datasheetUrl);
  }

  updateCaseLocation() {
    this.utilProvider.presentToast('Will update case location in future');
  }
}
