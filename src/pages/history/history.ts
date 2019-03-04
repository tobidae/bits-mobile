import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HistoryProvider } from "../../providers/history/history";
import { objToArr } from "../../shared/helpers";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { Case } from "../../shared/interfaces";
import { Stack } from "../../shared/helpers";

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  histories: {};

  constructor(private navCtrl: NavController, private navParams: NavParams, private historyProvider: HistoryProvider,
              private caseProvider: CaseDataProvider) {
    this.historyProvider.getUserHistory().subscribe(userHistory => {
      this.histories = this.addCaseInfoToHistory(objToArr(userHistory));
    })
  }

  addCaseInfoToHistory(histories: any[]) {
    const newArray = new Stack();

    histories.forEach(async histoire => {
      const caseId = histoire['caseId'];
      const caseInfo = (await this.caseProvider.getCaseById(caseId).take(1).toPromise());
      const caseName = caseInfo['name'];

      let body = null;

      switch (histoire['type']) {
        case 'order-processed':
          body = `The order for a ${caseName} was created.`;
          break;
        case 'in-queue':
          const caseHoldTime = Number.parseInt(caseInfo['maxHoldTime']);
          const totalWaitTime = caseHoldTime * histoire['queueCount'];
          body = `Current wait time is approximately ${totalWaitTime} hours!`;
          break;
      }
      histoire['body'] = body;
      histoire['caseName'] = caseName;
      newArray.push(histoire);
    });
    console.log(newArray.all());
    return newArray.all();
  }

}
