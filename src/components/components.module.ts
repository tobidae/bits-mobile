import { NgModule } from '@angular/core';
import { LazyImgComponent } from './lazy-img/lazy-img';
import { ItemCardComponent } from './item-card/item-card';
import { CustomLoaderComponent } from './custom-loader/custom-loader';
import { IonicModule } from "ionic-angular";

@NgModule({
	declarations: [LazyImgComponent,
    ItemCardComponent,
    CustomLoaderComponent],
	imports: [IonicModule],
	exports: [LazyImgComponent,
    ItemCardComponent,
    CustomLoaderComponent]
})
export class ComponentsModule {}
