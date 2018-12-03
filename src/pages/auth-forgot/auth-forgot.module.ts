import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthForgotPage } from './auth-forgot';

@NgModule({
  declarations: [
    AuthForgotPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthForgotPage),
  ],
})
export class AuthForgotPageModule {}
