import { Component, Input } from '@angular/core';
import { Case } from "../../shared/interfaces";
import { UtilProvider } from "../../providers/util/util";

@Component({
  selector: 'case-info',
  templateUrl: 'case-info.html'
})
export class CaseInfoComponent {
  @Input('case') caseData: Case;

  constructor(private utilProvider: UtilProvider) {

  }

  checkoutCase() {
    this.utilProvider.presentToast('Will be able to checkout specific case soon!');
  }

  returnCase() {
    this.utilProvider.presentToast('Will be able to scan case to return to location or transport');
  }

  updateCaseLocation() {
    this.utilProvider.presentToast('Will be able to update current case location soon');
  }

}
