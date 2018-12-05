import { Component, Input } from '@angular/core';
import { Case } from "../../shared/interfaces";

@Component({
  selector: 'case-info',
  templateUrl: 'case-info.html'
})
export class CaseInfoComponent {
  @Input('case') caseData: Case;

  constructor() {

  }

}
