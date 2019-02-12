import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { HistoryProvider } from "../../providers/history/history";

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
  // },{
  //   month: 'Dec',
  //   day: '3',
  //   info: 'Baylen Jobe returned a Oscilloscope',
  //   location: 'B2'
  // },{
  //   month: 'Dec',
  //   day: '3',
  //   info: 'Leonardo Castro checked out a Wattmeter',
  //   location: 'A2'
  // },{
  //   month: 'Dec',
  //   day: '1',
  //   info: 'Rachel McCartney checked out a Spectrum Analyzer',
  //   location: 'C5'
  // },{
  //   month: 'Nov',
  //   day: '30',
  //   info: 'Tobi Akerele is now watching an Oscilloscope',
  //   location: 'C2'
  // },{
  //   month: 'Nov',
  //   day: '22',
  //   info: 'Michael Scott broke the clamp meter',
  //   location: 'A3'
  // },{
  //   month: 'Nov',
  //   day: '22',
  //   info: 'Michael Scott checked out a clamp meter',
  //   location: 'A3'
  // },{
  //   month: 'Nov',
  //   day: '21',
  //   info: 'John Smith returned a clamp meter',
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
      this.histories = userHistory;
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
