import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from "../../providers/user-data/user-data";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { Case } from "../../shared/interfaces";

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  caseData: Case[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private userDataProvider: UserDataProvider,
              private caseDataProvider: CaseDataProvider) {
    // TODO Use beacon or BLE device to get approximate location of user
  }

  ionViewDidLoad() {
    this.userDataProvider.getUserCart()
      .subscribe((cartData: {})=> {
        for (const id in cartData) {
          this.caseDataProvider.getCaseById(id).take(1).subscribe((caseData: Case) => {
            this.caseData.push(caseData);
          });
        }
      })
  }

  placeOrder() {
    this.userDataProvider.placeOrder().then(data => {
      console.log(data);
    });

  }

}
