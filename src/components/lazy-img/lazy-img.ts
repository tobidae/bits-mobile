import { Component, Input } from '@angular/core';

@Component({
  selector: 'lazy-img',
  template: `
    <!--<div [class.placeholder]="placeholderActive">-->
    <div text-center [ngClass]="{ 'placeholder': placeholderActive }">
      <img [src]="inputSrc" lazy-load (loaded)="placeholderActive = false"/>
    </div>
  `
})
export class LazyImgComponent {
  @Input() inputSrc: string;

  // TODO: Initial value should be true, error since placeholder always shows up
  public placeholderActive: boolean = false;
}
