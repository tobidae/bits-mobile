import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from "../../providers/user-data/user-data";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { UtilProvider } from "../../providers/util/util";

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  userCart: any = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userDataProvider: UserDataProvider,
              private caseDataProvider: CaseDataProvider, private utilProvider: UtilProvider) {
    this.userDataProvider.getUserCart()
      .subscribe(userCart => {
        this.userCart = this.objToArr(userCart);
      })

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
    this.utilProvider.presentToast('Checkout Cart');
  }

}
