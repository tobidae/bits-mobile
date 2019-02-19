import { Component, Input, OnInit } from '@angular/core';
import { Case } from "../../shared/interfaces";
import { CaseDataProvider } from "../../providers/case-data/case-data";
import { UtilProvider } from "../../providers/util/util";
import { ViewCasePage } from "../../pages/view-case/view-case";
import { NavController } from "ionic-angular";

@Component({
  selector: 'cart-item',
  templateUrl: 'cart-item.html'
})
export class CartItemComponent implements OnInit{
  @Input('case') case: Case;
  @Input('type') cartType: string;
  isAvailableText: string = "Available";
  addToDBText: string;
 
  constructor(private caseDataProvider: CaseDataProvider, private utilProvider: UtilProvider, private navCtrl: NavController) {

  }

  viewCaseInfo() {
    this.navCtrl.push(ViewCasePage, {
      data: this.case
    })
  }

  ngOnInit() {
    if (!this.case.isAvailable) {
      this.isAvailableText = 'Not Available';
      if (this.cartType == 'cart') {
        // If the case is no longer available and it is in the cart, remove it. Since there is now a queue, this logic
        // is no longer required.
        // this.caseDataProvider.removeCaseFromCart(this.case.$key)
        //   .then(() => this.utilProvider.presentToast(`Removed ${this.case.name} from cart because it is no longer available`),
        //     () => this.utilProvider.presentToast(`Error removing ${this.case.name} from cart`));
        // this.caseDataProvider.addCaseToFav(this.case.$key);
      }
    } else {
      this.isAvailableText = 'Available';
    }

    if (this.cartType == 'cart') {
      this.addToDBText = 'Watch';
    } else if (this.cartType == 'watch') {
      this.addToDBText = 'Add to Cart';
    }
  }

  removeCaseFromUserDB() {
    if (this.cartType == 'cart') {
      this.caseDataProvider.removeCaseFromCart(this.case.$key)
        .then(() => this.utilProvider.presentToast(`Removed ${this.case.name} from cart`),
          () => this.utilProvider.presentToast(`Error removing ${this.case.name} from cart`));
    } else if (this.cartType == 'watch') {
      this.caseDataProvider.removeCaseFromFav(this.case.$key)
        .then(() => this.utilProvider.presentToast(`Removed ${this.case.name} from watch section`),
          () => this.utilProvider.presentToast(`Error removing ${this.case.name} from watch later`));
    }
  }

  addToUserDB() {
    if (this.cartType == 'cart') {
      this.caseDataProvider.addCaseToFav(this.case.$key)
        .then(() => this.utilProvider.presentToast(`You are now watching ${this.case.name}`),
          () => this.utilProvider.presentToast(`Error adding ${this.case.name} to cart`));
      this.caseDataProvider.removeCaseFromCart(this.case.$key);
    } else if (this.cartType == 'watch') {
      this.caseDataProvider.addCaseToCart(this.case.$key)
        .then(() => this.utilProvider.presentToast(`${this.case.name} is now in your cart.`),
          () => this.utilProvider.presentToast(`Error adding ${this.case.name} to cart`));
      this.caseDataProvider.removeCaseFromFav(this.case.$key);
    }
  }


}
