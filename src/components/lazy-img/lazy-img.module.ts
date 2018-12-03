import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { LazyImgComponent } from './lazy-img';

@NgModule({
  declarations: [
    LazyImgComponent,
  ],
  imports: [
    IonicModule.forRoot(LazyImgComponent),
  ],
  exports: [
    LazyImgComponent
  ]
})
export class LazyImgComponentModule {}
