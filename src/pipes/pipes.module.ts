import { NgModule } from '@angular/core';
import { IsAvailablePipe } from './is-available/is-available';
import { ShortenPipe } from './shorten/shorten';
import { MomentPipe } from "./moment/moment";
import { UnixPipe } from "./moment/unix";
import { CustomCalendarPipe } from "./moment/custom-calendar";
import { FromNowPipe } from "./moment/from-now";

@NgModule({
  declarations: [
    IsAvailablePipe,
    ShortenPipe,
    MomentPipe,
    UnixPipe,
    CustomCalendarPipe,
    FromNowPipe
  ],
  imports: [],
  exports: [
    IsAvailablePipe,
    ShortenPipe,
    MomentPipe,
    UnixPipe,
    CustomCalendarPipe,
    FromNowPipe
  ]
})
export class PipesModule {
}
