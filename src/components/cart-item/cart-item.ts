import { Component, Input } from '@angular/core';
import { Case } from "../../shared/interfaces";

@Component({
  selector: 'cart-item',
  templateUrl: 'cart-item.html'
})
export class CartItemComponent {
  @Input('case') case: Case;
  @Input('cart') cart: any;
 
  constructor() {

  }

}
