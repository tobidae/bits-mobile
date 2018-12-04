import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CaseDataProvider } from "../../providers/case-data/case-data";

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage implements OnInit{
  casesData: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private caseDataProvider: CaseDataProvider) {

  }

  ngOnInit() {
    this.caseDataProvider.getCases().subscribe(itemData => {
      this.casesData = this.objToArr(itemData);
    });
  }

  createNewCase() {

  }

  createNewReminder() {

  }

  objToArr(obj) {
    let arr = [];
    for (let key in obj) {
      let element = obj[key]
      element.$key = key;
      arr.push(element);
    }
    return arr;
  }

}
