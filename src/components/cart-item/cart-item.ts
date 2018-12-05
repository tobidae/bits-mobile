import { Component, Input, OnInit } from '@angular/core';
import { Case } from "../../shared/interfaces";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { UtilProvider } from "../../providers/util/util";

@Component({
  selector: 'cart-item',
  templateUrl: 'cart-item.html'
})
export class CartItemComponent implements OnInit{
  @Input('case') case: Case;
  @Input('type') cartType: string;
  isAvailableText: string = "Available";
 
  constructor(private caseDataProvider: CaseDataProvider, private utilProvider: UtilProvider) {

  }

  ngOnInit() {
    if (!this.case.isAvailable) this.isAvailableText = 'Not Available';
    else this.isAvailableText = 'Available';
  }

  removeCaseFromCart() {
    this.caseDataProvider.removeCaseFromCart(this.case.$key)
      .then(() => this.utilProvider.presentToast(`Removed ${this.case.name} from cart`),
        () => this.utilProvider.presentToast(`Error removing ${this.case.name} from cart`));
  }

  addToFav() {
    this.caseDataProvider.addCaseToFav(this.case.$key)
      .then(() => this.utilProvider.presentToast(`Removed ${this.case.name} from cart`),
        () => this.utilProvider.presentToast(`Error removing ${this.case.name} from cart`));
  }


}
