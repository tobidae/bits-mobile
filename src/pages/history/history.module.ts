import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { HistoryPage } from './history';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    HistoryPage,
  ],
  imports: [
    IonicModule,
    PipesModule
  ],
})
export class HistoryPageModule {}
