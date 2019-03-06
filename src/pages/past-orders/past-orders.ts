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
  userPastOrders;
  constructor(public navCtrl: NavController, public navParams: NavParams, private userDataProvider: UserDataProvider) {
    this.userDataProvider.getUserPastOrders()
      .subscribe(pastOrders => {
        this.userPastOrders = objToArr(pastOrders);
      });
  }

  ionViewDidLoad() {

  }

}
