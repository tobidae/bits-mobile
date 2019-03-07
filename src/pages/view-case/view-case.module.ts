import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewCasePage } from './view-case';
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    ViewCasePage,
  ],
  imports: [
    IonicPageModule.forChild(ViewCasePage),
    ComponentsModule,
    PipesModule
  ],
})
export class ViewCasePageModule {}
