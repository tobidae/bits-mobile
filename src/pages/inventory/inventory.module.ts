import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InventoryPage } from './inventory';
import { ComponentsModule } from "../../components/components.module";
import { PipesModule } from "../../pipes/pipes.module";
import { SuperTabsModule } from "ionic2-super-tabs";

@NgModule({
  declarations: [
    InventoryPage,
  ],
  imports: [
    IonicPageModule.forChild(InventoryPage),
    ComponentsModule,
    PipesModule,
    SuperTabsModule
  ],
})
export class InventoryPageModule {}
