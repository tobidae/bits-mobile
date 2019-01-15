import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  histories: any[] = [{
    month: 'Dec',
    day: '4',
    info: 'Adam Jennerjahn checkout out a multimeter',
    timeLeft: '2 hrs',
    location: 'A3'
  },{
    month: 'Dec',
    day: '3',
    info: 'Baylen Jobe returned a Oscilloscope',
    location: 'B2'
  },{
    month: 'Dec',
    day: '3',
    info: 'Leonardo Castro checked out a Wattmeter',
    location: 'A2'
  },{
    month: 'Dec',
    day: '1',
    info: 'Rachel McCartney checked out a Spectrum Analyzer',
    location: 'C5'
  },{
    month: 'Nov',
    day: '30',
    info: 'Tobi Akerele is now watching an Oscilloscope',
    location: 'C2'
  },{
    month: 'Nov',
    day: '22',
    info: 'Michael Scott broke the clamp meter',
    location: 'A3'
  },{
    month: 'Nov',
    day: '22',
    info: 'Michael Scott checked out a clamp meter',
    location: 'A3'
  },{
    month: 'Nov',
    day: '21',
    info: 'John Smith returned a clamp meter',
    location: 'A3'
  }];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

}
