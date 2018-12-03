import { Component, Input } from '@angular/core';
import { UtilProvider } from "../../providers/util/util";

@Component({
  selector: 'item-card',
  templateUrl: 'item-card.html'
})
export class ItemCardComponent {
  @Input('case') case: any;

  constructor(
    public utilProvider: UtilProvider) {

  }

  addCaseToCart() {

  }

  addToFav() {

  }

  presentToast(message) {
    return this.utilProvider.presentToast(message);
  }

}
