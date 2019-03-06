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

  @Input('info') orderInfo: any;
  case: Case;
  caseId: string;

  constructor(private navCtrl: NavController, private caseDataProvider: CaseDataProvider) {
    this.caseId = this.orderInfo.caseId;

    if (this.caseId)
      this.caseDataProvider.getCaseById(this.orderInfo.caseId).subscribe((caseData: Case) => {
        caseData['caseId'] = this.caseId;
        if (caseData.tags) {
          caseData.tagsArr = caseData.tags.split(',');
        }
        this.case = caseData;
      });
  }

  viewCaseInfo() {
    this.navCtrl.push(ViewCasePage, {
      data: this.case
    })
  }
}
