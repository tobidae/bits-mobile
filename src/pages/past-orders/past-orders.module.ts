import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PastOrdersPage } from './past-orders';
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    PastOrdersPage,
  ],
  imports: [
    IonicPageModule.forChild(PastOrdersPage),
    ComponentsModule,
    PipesModule
  ],
})
export class PastOrdersPageModule {}
