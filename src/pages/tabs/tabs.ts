import {Component} from '@angular/core';
import {InventoryPage} from "../inventory/inventory";
import {ScanPage} from "../scan/scan";
import {SettingsPage} from "../settings/settings";
import {HistoryPage} from "../history/history";
import { CartPage } from "../cart/cart";
import { UserDataProvider } from "../../providers/user-data/user-data";

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

  constructor(private userDataProvider: UserDataProvider) {
    setTimeout(() => {
      this.userDataProvider.getUserCart().subscribe(userCart => {
        this.cartCount = Object.keys(userCart).length;
      });
    }, 500);
  }
}
