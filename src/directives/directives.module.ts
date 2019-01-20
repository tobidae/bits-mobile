import { NgModule } from '@angular/core';
import { LazyLoadDirective } from './lazy-load/lazy-load';
import { SwipeSegmentDirective } from './swipe-segment/swipe-segment';
@NgModule({
	declarations: [LazyLoadDirective,
    SwipeSegmentDirective],
	imports: [],
	exports: [LazyLoadDirective,
    SwipeSegmentDirective]
})
export class DirectivesModule {}
