import { Component, Input } from '@angular/core';
import { UtilProvider } from "../../providers/util/util";
import { CaseDataProvider } from "../../providers/case-data/case-data";

@Component({
  selector: 'item-card',
  templateUrl: 'item-card.html'
})
export class ItemCardComponent {
  @Input('case') case: any;

  constructor(
    public utilProvider: UtilProvider, private caseDataProvider: CaseDataProvider) {

  }

  addCaseToCart() {
    return this.caseDataProvider.addCaseToCart(this.case.$key)
      .then(() => this.utilProvider.presentToast(`Added ${this.case.name} to cart`),
        () => this.utilProvider.presentToast(`Error adding ${this.case.name} to cart`));
  }

  removeCaseFromCart() {
    return this.caseDataProvider.removeCaseFromCart(this.case.$key);

  }

  addToFav() {

  }

  presentToast(message) {
    return this.utilProvider.presentToast(message);
  }

}
