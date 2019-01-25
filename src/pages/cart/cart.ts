import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from "../../providers/user-data/user-data";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { UtilProvider } from "../../providers/util/util";
import { CheckoutPage } from "../checkout/checkout";

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  userCart: any = null;
  userFav: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userDataProvider: UserDataProvider,
              private caseDataProvider: CaseDataProvider, private utilProvider: UtilProvider, private modalCtrl: ModalController) {
    this.userDataProvider.getUserCart()
      .subscribe(userCart => {
        this.userCart = this.objToArr(userCart);
      });
    this.userDataProvider.getUserFav()
      .subscribe(userFav => {
        this.userFav = this.objToArr(userFav);
      });
  }

  objToArr(obj) {
    const newArr = [];
    for (let key in obj) {
      this.caseDataProvider.getCaseById(key).take(1).subscribe(caseData => {
        caseData['$key'] = key;
        newArr.push(caseData);
      })
    }
    return newArr;
  }

  checkoutCart() {
    const modal = this.modalCtrl.create(CheckoutPage);

    // TODO: Handle when the checkout page has been dismissed
    modal.onDidDismiss(data => {
      this.utilProvider.presentToast('Your order has been processed');
    });
    modal.present();
  }

}
