import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage {
  item: {};
  itemData = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.item = {
      imageUrl: '../assets/imgs/thermometer.jpg',
      title: 'Thermometer',
      isAvailable: true,
      lastLocation: 'A4',
      maxHoldTime: '24 hrs'
    };
  }

}
