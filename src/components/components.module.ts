import { NgModule } from '@angular/core';
import { LazyImgComponent } from './lazy-img/lazy-img';
import { ItemCardComponent } from './item-card/item-card';
import { CustomLoaderComponent } from './custom-loader/custom-loader';
import { IonicModule } from "ionic-angular";
import { CartItemComponent } from './cart-item/cart-item';
import { CaseInfoComponent } from './case-info/case-info';
import { PipesModule } from "../pipes/pipes.module";
import { PastOrderItemComponent } from './past-order-item/past-order-item';

@NgModule({
  declarations: [LazyImgComponent,
    ItemCardComponent,
    CustomLoaderComponent,
    CartItemComponent,
    CaseInfoComponent,
    PastOrderItemComponent],
  imports: [
    IonicModule,
    PipesModule],
  exports: [
    LazyImgComponent,
    ItemCardComponent,
    CustomLoaderComponent,
    CartItemComponent,
    CaseInfoComponent,
    PastOrderItemComponent]
})
export class ComponentsModule {
}
