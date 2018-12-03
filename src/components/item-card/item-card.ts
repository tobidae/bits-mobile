import { Component, Input } from '@angular/core';
import { UtilProvider } from "../../providers/util/util";

@Component({
  selector: 'item-card',
  templateUrl: 'item-card.html'
})
export class ItemCardComponent {
  @Input('item') item: any;

  constructor(
    public utilProvider: UtilProvider) {

  }

  addItemToCart() {

  }

  addToFav() {

  }

  presentToast(message) {
    return this.utilProvider.presentToast(message);
  }

}
