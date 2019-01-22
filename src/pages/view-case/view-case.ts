import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Case } from "../../shared/interfaces";

@IonicPage()
@Component({
  selector: 'page-view-case',
  templateUrl: 'view-case.html',
})
export class ViewCasePage {
  caseKey: string;
  caseData: Case;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.caseData = this.navParams.get('data');
    this.caseKey = this.caseData.$key;
  }

}
