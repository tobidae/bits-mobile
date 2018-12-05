import { NgModule } from '@angular/core';
import { LazyImgComponent } from './lazy-img/lazy-img';
import { ItemCardComponent } from './item-card/item-card';
import { CustomLoaderComponent } from './custom-loader/custom-loader';
import { IonicModule } from "ionic-angular";
import { CartItemComponent } from './cart-item/cart-item';
import { CaseInfoComponent } from './case-info/case-info';
import { PipesModule } from "../pipes/pipes.module";

@NgModule({
  declarations: [LazyImgComponent,
    ItemCardComponent,
    CustomLoaderComponent,
    CartItemComponent,
    CaseInfoComponent],
  imports: [
    IonicModule,
    PipesModule],
  exports: [
    LazyImgComponent,
    ItemCardComponent,
    CustomLoaderComponent,
    CartItemComponent,
    CaseInfoComponent]
})
export class ComponentsModule {
}
