import { Component, Input } from '@angular/core';
import { UtilProvider } from "../../providers/util/util";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { Case } from "../../shared/interfaces";

@Component({
  selector: 'item-card',
  templateUrl: 'item-card.html'
})
export class ItemCardComponent {
  @Input('case') case: Case;
  @Input('cart') cart: any = {};
  @Input('favCart') favCart: any = {};
  @Input('userId') userId: string;

  constructor(public utilProvider: UtilProvider, private caseDataProvider: CaseDataProvider) {

  }

  addCaseToCart() {
    return this.caseDataProvider.addCaseToCart(this.case.$key)
      .then(() => this.utilProvider.presentToast(`Added ${this.case.name} to cart`),
        () => this.utilProvider.presentToast(`Error adding ${this.case.name} to cart`));
  }

  removeCaseFromCart() {
    return this.caseDataProvider.removeCaseFromCart(this.case.$key)
      .then(() => this.utilProvider.presentToast(`Removed ${this.case.name} from cart`),
        () => this.utilProvider.presentToast(`Error removing ${this.case.name} from cart`));
  }

  addToFav() {
    return this.caseDataProvider.addCaseToFav(this.case.$key)
      .then(() => this.utilProvider.presentToast(`Added ${this.case.name} to favorites`),
        () => this.utilProvider.presentToast(`Error adding ${this.case.name} to favorites`));
  }

  removeCaseFromFav() {
    return this.caseDataProvider.removeCaseFromFav(this.case.$key)
      .then(() => this.utilProvider.presentToast(`Removed ${this.case.name} from favorites`),
        () => this.utilProvider.presentToast(`Error removing ${this.case.name} from favorites`));
  }
}
