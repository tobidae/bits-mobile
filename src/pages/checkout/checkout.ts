import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { UserDataProvider } from "../../providers/user-data/user-data";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { Case } from "../../shared/interfaces";
import { TabsPage } from "../tabs/tabs";
import { factorySectors } from "../../shared/helpers";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-checkout',
  templateUrl: 'checkout.html',
})
export class CheckoutPage {
  caseData: Case[] = [];
  userInfo: any;
  pickupLocation: string;
  isLoading: boolean = true;
  factorySectors: any[] = factorySectors;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userDataProvider: UserDataProvider,
              private caseDataProvider: CaseDataProvider, private viewCtrl: ViewController,
              private utilProvider: UtilProvider) {
  }

  ionViewDidLoad() {
    this.userDataProvider.getUserCart()
      .subscribe((cartData: {}) => {
        this.isLoading = false;
        for (const id in cartData) {
          this.caseDataProvider.getCaseById(id).take(1).subscribe((caseData: Case) => {
            this.caseData.push(caseData);
          });
        }
      });
    this.userDataProvider.getUserInfo().subscribe(userInfo => {
      this.isLoading = false;
      this.userInfo = userInfo;
      this.pickupLocation = userInfo['pickupLocation'];
    })
  }

  placeOrder() {
    if (this.pickupLocation) {
      this.isLoading = true;
      this.userDataProvider.placeOrder()
      // .then(data => this.navCtrl.popAll())
        .then(() => {
          this.isLoading = false;
          return this.viewCtrl.dismiss({ordered: true});
        })
        .catch(error => {
          console.log(error);
          return this.viewCtrl.dismiss({ordered: false});
        });

    } else {
      this.utilProvider.presentToast('Please select a pickup location', 2500);
    }
  }

  changeLocation(e) {
    this.userDataProvider.setUserInfo({
      pickupLocation: this.pickupLocation
    });
  }

  backButtonAction() {
    return this.viewCtrl.dismiss();
  }

}
