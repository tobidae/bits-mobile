import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserDataProvider } from "../../providers/user-data/user-data";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { Case } from "../../shared/interfaces";
import { TabsPage } from "../tabs/tabs";

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  caseData: Case[] = [];
  userInfo: any;
  isLoading: boolean = true;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userDataProvider: UserDataProvider,
              private caseDataProvider: CaseDataProvider, private viewCtrl: ViewController) {
    // TODO Use beacon or BLE device to get approximate location of user
  }

  ionViewDidLoad() {
    this.userDataProvider.getUserCart()
      .subscribe((cartData: {})=> {
        this.isLoading = false;
        for (const id in cartData) {
          this.caseDataProvider.getCaseById(id).take(1).subscribe((caseData: Case) => {
            this.caseData.push(caseData);
          });
        }
      });
    this.userDataProvider.getUserInfo().take(1).subscribe(userInfo => {
      this.isLoading = false;
      this.userInfo = userInfo;
    })
  }

  placeOrder() {
    this.isLoading = true;
    this.userDataProvider.placeOrder()
      // .then(data => this.navCtrl.popAll())
      .then(() => {
        this.isLoading = false;
        return this.viewCtrl.dismiss();
      })
      .catch(error => {
        console.log(error);
        return this.viewCtrl.dismiss();
      });

  }

  backButtonAction() {
    return this.viewCtrl.dismiss();
  }

}
