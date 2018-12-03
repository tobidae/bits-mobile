import { Component, Input } from '@angular/core';

@Component({
  selector: 'lazy-img',
  template: `
    <div [class.placeholder]="placeholderActive">
      <img [src]="inputSrc" lazy-load (loaded)="placeholderActive = false"/>
    </div>
  `
})
export class LazyImgComponent {
  @Input() inputSrc: string;

  public placeholderActive: boolean = true;
}
