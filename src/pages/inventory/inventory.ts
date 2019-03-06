import { Component, OnInit, ViewChild } from '@angular/core';
import { Events, IonicPage, ModalController, NavController, NavParams, Slides } from 'ionic-angular';
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { AuthProvider } from "../../providers/auth/auth";
import { CreateCasePage } from "../create-case/create-case";
import { objToArr } from "../../shared/helpers";

@IonicPage()
@Component({
  selector: 'page-inventory',
  templateUrl: 'inventory.html',
})
export class InventoryPage implements OnInit {
  casesData: any;
  userCart: any = {};
  favCart: any = {};
  userId: string;
  inventoryCategory: string;

  @ViewChild('inventorySlider') slider: Slides;
  slides: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private caseDataProvider: CaseDataProvider,
              private userDataProvider: UserDataProvider, private authProvider: AuthProvider,
              private modalCtrl: ModalController, private events: Events) {
    this.userId = this.authProvider.userID();
    this.slides = [{
      id: "available",
      value: true
    }, {
      id: "unavailable",
      value: false
    }];
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
    if (currentSlide) this.inventoryCategory = currentSlide.id;
  }

  getAppData() {
    this.caseDataProvider.getCases().subscribe(itemData => {
      this.casesData = objToArr(itemData);
    });
    // this.userDataProvider.getUserCart().subscribe(userCart => {
    //   this.userCart = userCart ? userCart : {};
    // });

    this.events.subscribe('data:userCart', (cart) => {
      this.userCart = cart ? cart : {};
    });
    this.userDataProvider.getUserFav().subscribe(userFav => {
      this.favCart = userFav ? userFav : {};
    });
  }

  createNewCase() {
    // return this.navCtrl.push(CreateCasePage);
    const modal = this.modalCtrl.create(CreateCasePage);
    return modal.present();
  }

}
