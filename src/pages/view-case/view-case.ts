import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { Case } from "../../shared/interfaces";
import { CheckoutPage } from "../checkout/checkout";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-view-case',
  templateUrl: 'view-case.html',
})
export class ViewCasePage {
  caseKey: string;
  caseData: Case;

  constructor(public navCtrl: NavController, public navParams: NavParams, private caseDataProvider: CaseDataProvider,
              private utilProvider: UtilProvider, private modalCtrl: ModalController) {
    this.caseData = this.navParams.get('data');
    this.caseKey = this.caseData.$key;
  }


  checkoutCase() {
    return this.caseDataProvider.addCaseToCart(this.caseKey)
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
}
