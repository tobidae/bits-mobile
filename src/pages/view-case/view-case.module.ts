import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewCasePage } from './view-case';
import { ComponentsModule } from "../../components/components.module";

@NgModule({
  declarations: [
    ViewCasePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewCasePage),
    ComponentsModule
  ],
})
export class ViewCasePageModule {}
