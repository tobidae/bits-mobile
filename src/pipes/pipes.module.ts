import { NgModule } from '@angular/core';
import { IsAvailablePipe } from './is-available/is-available';
import { ShortenPipe } from './shorten/shorten';
@NgModule({
	declarations: [IsAvailablePipe,
    ShortenPipe],
	imports: [],
	exports: [IsAvailablePipe,
    ShortenPipe]
})
export class PipesModule {}
