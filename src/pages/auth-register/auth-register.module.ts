import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthRegisterPage } from './auth-register';

@NgModule({
  declarations: [
    AuthRegisterPage,
  ],
  imports: [
    IonicPageModule.forChild(AuthRegisterPage),
  ],
})
export class AuthRegisterPageModule {}
