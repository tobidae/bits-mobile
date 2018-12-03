import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Camera } from '@ionic-native/camera';
import {InventoryPage} from "../pages/inventory/inventory";
import {ScanPage} from "../pages/scan/scan";
import {HistoryPage} from "../pages/history/history";
import {SettingsPage} from "../pages/settings/settings";
import { AuthGuardProvider } from '../providers/auth-guard/auth-guard';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../config';
import { AuthLoginPage } from "../pages/auth-login/auth-login";
import { AuthRegisterPage } from "../pages/auth-register/auth-register";
import { AuthProvider } from "../providers/auth/auth";
import { QRScanner } from "@ionic-native/qr-scanner";
import { CodePush } from "@ionic-native/code-push";
import { CacheImageProvider } from '../providers/cache-image/cache-image';
import { LazyLoadDirective } from "../directives/lazy-load/lazy-load";
import { ComponentsModule } from "../components/components.module";
import { CommonModule } from "@angular/common";
import { UtilProvider } from '../providers/util/util';
import { CaseDataProvider } from "../providers/case-data/case-data";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireDatabaseModule } from "@angular/fire/database";

@NgModule({
  declarations: [
    MyApp,
    InventoryPage,
    ScanPage,
    HistoryPage,
    SettingsPage,
    TabsPage,
    AuthLoginPage,
    AuthRegisterPage,
    LazyLoadDirective
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    ComponentsModule,
    CommonModule,
    HttpClientModule,
    AngularFireDatabaseModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    InventoryPage,
    ScanPage,
    HistoryPage,
    SettingsPage,
    TabsPage,
    AuthLoginPage,
    AuthRegisterPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AuthGuardProvider,
    AngularFireAuth,
    Camera,
    QRScanner,
    CodePush,
    CacheImageProvider,
    UtilProvider,
    CaseDataProvider
  ]
})
export class AppModule {}
