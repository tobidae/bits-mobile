import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { objToArr } from "../../shared/helpers";
import { UserDataProvider } from "../../providers/user-data/user-data";


@IonicPage()
@Component({
  selector: 'page-past-orders',
  templateUrl: 'past-orders.html',
})
export class PastOrdersPage {
  userPastOrders: any[] = null;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userDataProvider: UserDataProvider) {
  }

  ionViewDidLoad() {
    let arr = [];
    this.userDataProvider.getUserPastOrders()
      .subscribe(pastOrders => {
        const orderArr = objToArr(pastOrders);

        orderArr.forEach(order => {
          arr.unshift(order);
        });
        this.userPastOrders = arr;
      });

  }

}
