import { Component, OnInit } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams } from 'ionic-angular';
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { AuthProvider } from "../../providers/auth/auth";
import { CreateCasePage } from "../create-case/create-case";

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage implements OnInit{
  casesData: any;
  userCart: any = {};
  favCart: any = {};
  userId: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private caseDataProvider: CaseDataProvider,
              private userDataProvider: UserDataProvider, private authProvider: AuthProvider,
              private modalCtrl: ModalController) {
    this.userId = this.authProvider.userID();
  }

  ngOnInit() {
    this.caseDataProvider.getCases().subscribe(itemData => {
      this.casesData = this.objToArr(itemData);
    });
    this.userDataProvider.getUserCart().subscribe(userCart => {
      if (userCart) {
        this.userCart = userCart;
      }
    });
    this.userDataProvider.getUserFav().subscribe(userFav => {
      if (userFav) {
        this.favCart = userFav;
      }
    });
  }

  createNewCase() {
    // return this.navCtrl.push(CreateCasePage);
    const modal = this.modalCtrl.create(CreateCasePage);
    return modal.present();
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
