import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UserDataProvider } from "../../providers/user-data/user-data";

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {
  userCart: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userDataProvider: UserDataProvider) {
    this.userDataProvider.getUserCart().subscribe(userCart => {
      this.userCart = this.objToArr(userCart);
    })

  }

  objToArr(obj) {
    const newArr = [];
    for (let key in obj) {
      newArr.push(key);
    }
    return newArr;
  }

}
