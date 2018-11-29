import {Component} from '@angular/core';
import {InventoryPage} from "../inventory/inventory";
import {ScanPage} from "../scan/scan";
import {SettingsPage} from "../settings/settings";
import {HistoryPage} from "../history/history";
import { CartPage } from "../cart/cart";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = InventoryPage;
  tab2Root = ScanPage;
  tab3Root = HistoryPage;
  tab4Root = CartPage;
  tab5Root = SettingsPage;

  constructor() {

  }
}
