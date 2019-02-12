import {Component} from '@angular/core';
import {InventoryPage} from "../inventory/inventory";
import {ScanPage} from "../scan/scan";
import {SettingsPage} from "../settings/settings";
import {HistoryPage} from "../history/history";
import { CartPage } from "../cart/cart";
import { UserDataProvider } from "../../providers/user-data/user-data";
import { Events } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = InventoryPage;
  tab2Root = ScanPage;
  tab3Root = HistoryPage;
  tab4Root = CartPage;
  tab5Root = SettingsPage;

  cartCount: number;

  constructor(private userDataProvider: UserDataProvider, private events: Events) {
    setTimeout(() => {
      this.userDataProvider.getUserCart().subscribe(userCart => {
        this.events.publish('data:userCart', userCart);
        this.cartCount = userCart ? Object.keys(userCart).length : null;
      });
    }, 500);
  }
}
