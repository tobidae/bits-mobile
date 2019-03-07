import { Component, Input } from '@angular/core';
import { Case } from "../../shared/interfaces";
import { ViewCasePage } from "../../pages/view-case/view-case";
import { NavController } from "ionic-angular";
import { CaseDataProvider } from "../../providers/case-data/case-data";

@Component({
  selector: 'past-order-item',
  templateUrl: 'past-order-item.html'
})
export class PastOrderItemComponent {

  @Input('pastOrder') pastOrder: any;
  case: Case;

  constructor(private navCtrl: NavController, private caseDataProvider: CaseDataProvider) {
    setTimeout(() => {
      if (this.pastOrder.caseId)
        this.caseDataProvider.getCaseById(this.pastOrder.caseId).subscribe((caseData: Case) => {
          caseData['caseId'] = this.pastOrder.caseId;
          if (caseData.tags) {
            caseData.tagsArr = caseData.tags.split(',');
          }
          this.case = caseData;
        });
    }, 100);
  }

  ionViewDidLoad(){
  }

  viewCaseInfo() {
    this.navCtrl.push(ViewCasePage, {
      data: this.case,
      pastOrder: this.pastOrder
    })
  }
}
