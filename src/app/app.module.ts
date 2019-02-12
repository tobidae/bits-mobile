import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { InventoryPage } from "../pages/inventory/inventory";
import { ScanPage } from "../pages/scan/scan";
import { HistoryPage } from "../pages/history/history";
import { SettingsPage } from "../pages/settings/settings";
import { AuthGuardProvider } from '../providers/auth-guard/auth-guard';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuth } from '@angular/fire/auth';
import { firebaseConfig } from '../config';
import { AuthLoginPage } from "../pages/auth-login/auth-login";
import { AuthProvider } from "../providers/auth/auth";
import { CodePush } from "@ionic-native/code-push";
import { CacheImageProvider } from '../providers/cache-image/cache-image';
import { ComponentsModule } from "../components/components.module";
import { CommonModule } from "@angular/common";
import { UtilProvider } from '../providers/util/util';
import { CaseDataProvider } from "../providers/case-data/case-data";
import { HttpClientModule } from "@angular/common/http";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AuthLoginPageModule } from "../pages/auth-login/auth-login.module";
import { HistoryPageModule } from "../pages/history/history.module";
import { InventoryPageModule } from "../pages/inventory/inventory.module";
import { ScanPageModule } from "../pages/scan/scan.module";
import { SettingsPageModule } from "../pages/settings/settings.module";
import { AuthForgotPage } from "../pages/auth-forgot/auth-forgot";
import { AuthForgotPageModule } from "../pages/auth-forgot/auth-forgot.module";
import { UserDataProvider } from '../providers/user-data/user-data';
import { CartPage } from "../pages/cart/cart";
import { CartPageModule } from "../pages/cart/cart.module";
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { CreateCasePage } from "../pages/create-case/create-case";
import { CreateCasePageModule } from "../pages/create-case/create-case.module";
import { UploadProvider } from '../providers/upload/upload';
import { Diagnostic } from "@ionic-native/diagnostic";
import { File } from "@ionic-native/file";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";
import { ViewCasePage } from "../pages/view-case/view-case";
import { ViewCasePageModule } from "../pages/view-case/view-case.module";
import { CheckoutPage } from "../pages/checkout/checkout";
import { CheckoutPageModule } from "../pages/checkout/checkout.module";
import { HistoryProvider } from '../providers/history/history';

@NgModule({
  declarations: [
    MyApp,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    ComponentsModule,
    CommonModule,
    HttpClientModule,
    AngularFireDatabaseModule,
    AuthLoginPageModule,
    AuthForgotPageModule,
    HistoryPageModule,
    InventoryPageModule,
    ScanPageModule,
    SettingsPageModule,
    CartPageModule,
    CreateCasePageModule,
    ViewCasePageModule,
    CheckoutPageModule
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
    AuthForgotPage,
    CartPage,
    CreateCasePage,
    ViewCasePage,
    CheckoutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AuthProvider,
    AuthGuardProvider,
    AngularFireAuth,
    BarcodeScanner,
    CodePush,
    CacheImageProvider,
    UtilProvider,
    CaseDataProvider,
    UserDataProvider,
    UploadProvider,
    Diagnostic,
    File,
    FilePath,
    Camera,
    HistoryProvider
  ]
})
export class AppModule {
}
