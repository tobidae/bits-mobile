import { NgModule } from '@angular/core';
import { LazyImgComponent } from './lazy-img/lazy-img';
import { ItemCardComponent } from './item-card/item-card';
import { CustomLoaderComponent } from './custom-loader/custom-loader';
import { IonicModule } from "ionic-angular";
import { CartItemComponent } from './cart-item/cart-item';

@NgModule({
	declarations: [LazyImgComponent,
    ItemCardComponent,
    CustomLoaderComponent,
    CartItemComponent],
	imports: [IonicModule],
	exports: [LazyImgComponent,
    ItemCardComponent,
    CustomLoaderComponent,
    CartItemComponent]
})
export class ComponentsModule {}
