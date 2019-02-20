import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { HistoryProvider } from "../../providers/history/history";
import { objToArr } from "../../shared/helpers";

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  @ViewChild('historySlider') slider: Slides;
  slides: any;
  histories: {};
  // histories: any[] = [{
  //   month: 'Dec',
  //   day: '4',
  //   info: 'Adam Jennerjahn checkout out a multimeter',
  //   timeLeft: '2 hrs',
  //   location: 'A3'
  // }];
  historyCategory: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public historyProvider: HistoryProvider) {
    this.slides = [{
      id: "global",
      value: true
    }, {
      id: "me",
      value: false
    }];
    this.historyCategory = 'me';
    this.historyProvider.getUserHistory().subscribe(userHistory => {
      this.histories = objToArr(userHistory);
    })

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
    this.historyCategory = currentSlide.id;
  }

}
