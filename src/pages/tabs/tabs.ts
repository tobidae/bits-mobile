import {Component} from '@angular/core';
import {InventoryPage} from "../inventory/inventory";
import {ScanPage} from "../scan/scan";
import {SettingsPage} from "../settings/settings";
import {HistoryPage} from "../history/history";

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = InventoryPage;
  tab2Root = ScanPage;
  tab3Root = HistoryPage;
  tab4Root = SettingsPage;
  tab5Root = SettingsPage;

  constructor() {

  }
}
