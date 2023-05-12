import { Directive, Input, OnInit, ElementRef } from '@angular/core';
import tippy from 'tippy.js';
@Directive({
  selector: '[appTippy]',
})
export class Tippy1Directive implements OnInit {
  @Input('tippyOptions') public tippyOptions: Object;

  constructor(private el: ElementRef) {
    this.el = el;
  }

  public ngOnInit() {
    tippy(this.el.nativeElement, this.tippyOptions || {});
  }
}
