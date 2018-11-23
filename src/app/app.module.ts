import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {InventoryPage} from "../pages/inventory/inventory";
import {ScanPage} from "../pages/scan/scan";
import {HistoryPage} from "../pages/history/history";
import {SettingsPage} from "../pages/settings/settings";
import { AuthenticationProvider } from '../providers/authentication/authentication';
import { AuthGuardProvider } from '../providers/auth-guard/auth-guard';

@NgModule({
  declarations: [
    MyApp,
    InventoryPage,
    ScanPage,
    HistoryPage,
    SettingsPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InventoryPage,
    ScanPage,
    HistoryPage,
    SettingsPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthenticationProvider,
    AuthGuardProvider
  ]
})
export class AppModule {}
