import { Component, Input } from '@angular/core';
import { Case } from "../../shared/interfaces";
import { UtilProvider } from "../../providers/util/util";
import { AlertController } from "ionic-angular";
import { CaseDataProvider } from "../../providers/case-data/case-data";

@Component({
  selector: 'case-info',
  templateUrl: 'case-info.html'
})
export class CaseInfoComponent {
  @Input('case') caseData: Case;

  constructor(private utilProvider: UtilProvider, private alertCtrl: AlertController,
              private caseDataProvider: CaseDataProvider) {
  }

  checkoutCase() {
    this.utilProvider.presentToast('Will be able to checkout specific case soon!');
  }

  returnCase() {
    this.utilProvider.presentToast('Will be able to scan case to return to location or transport');
  }

  updateCaseLocation() {
    const sectorCol = ['A', 'B', 'C', 'D', 'E'];
    let inputs = [];
    // TODO: Store the proper sections from the factory floor
    for (let i = 1; i < 6; i++) {
      sectorCol.every(value => {
        const sector = value + i;
        inputs.push({
          type: 'radio',
          label: sector,
          value: sector,
          checked: this.caseData.lastLocation == sector
        });
        return true;
      });
    }
    inputs = inputs.sort((a, b) => {
      if (a.label > b.label) {
        return 1;
      } else if (a.label < b.label) {
        return -1;
      }
      return 0;
    });
    const prompt = this.alertCtrl.create({
      title: 'Update Case Location',
      inputs: inputs
    });
    prompt.addButton('Cancel');
    prompt.addButton({
      text: 'Save',
      handler: data => {
        this.caseDataProvider.updateCaseLocation(this.caseData.$key, data).then(() => {
          this.caseData.lastLocation = data;
        });
      }
    });
    prompt.present();

  }

}
