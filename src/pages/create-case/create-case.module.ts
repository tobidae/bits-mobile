import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CreateCasePage } from './create-case';

@NgModule({
  declarations: [
    CreateCasePage,
  ],
  imports: [
    IonicPageModule.forChild(CreateCasePage),
  ],
})
export class CreateCasePageModule {}
