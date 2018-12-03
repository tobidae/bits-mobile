import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LazyImgComponent } from './lazy-img';

@NgModule({
  declarations: [
    LazyImgComponent,
  ],
  imports: [
    IonicPageModule.forChild(LazyImgComponent),
  ],
  exports: [
    LazyImgComponent
  ]
})
export class LazyImgComponentModule {}
