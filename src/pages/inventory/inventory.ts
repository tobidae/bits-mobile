import { Component, OnInit, ViewChild } from '@angular/core';
import { IonicPage, ModalController, NavController, NavParams, Slides } from 'ionic-angular';
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { AuthProvider } from "../../providers/auth/auth";
import { CreateCasePage } from "../create-case/create-case";
import { ViewCasePage } from "../view-case/view-case";
import { Case } from "../../shared/interfaces";

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
  inventoryCategory: string;

  @ViewChild('inventorySlider') slider: Slides;
  slides: any;

  public categories: Array<string> = ['available', 'unavailable'];

  constructor(public navCtrl: NavController, public navParams: NavParams, private caseDataProvider: CaseDataProvider,
              private userDataProvider: UserDataProvider, private authProvider: AuthProvider,
              private modalCtrl: ModalController) {
    this.userId = this.authProvider.userID();
    this.slides = [
      {
        id: "available",
        value: true
      },{
        id: "unavailable",
        value: false
      }
    ];
  }

  ngOnInit() {
    this.inventoryCategory = 'available';
    this.getAppData();
  }

  onSegmentChanged(segmentButton) {
    const selectedIndex = this.slides.findIndex((slide) => {
      return slide.id === segmentButton.value;
    });
    this.slider.slideTo(selectedIndex);
  }

  onSlideChanged() {
    let currentIndex = this.slider.getActiveIndex();
    const currentSlide = this.slides[currentIndex];
    this.inventoryCategory = currentSlide.id;
  }

  getAppData() {
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

  viewCaseInfo(caseData: Case) {
    this.navCtrl.push(ViewCasePage, {
      data: caseData
    })
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
