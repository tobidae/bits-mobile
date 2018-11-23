import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthLoginPage } from './auth-login';

@NgModule({
  declarations: [
    AuthLoginPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthLoginPage),
  ],
})
export class AuthLoginPageModule {}
