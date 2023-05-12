import { Directive, ElementRef, NgZone, OnInit } from '@angular/core';
import tippy from 'tippy.js';

@Directive({
  selector: '[appTooltip]',
})
export class TooltipDirective implements OnInit {
  constructor(private readonly zone: NgZone, private readonly el: ElementRef) {}

  ngOnInit() {
    // this.setupTooltip();

    this.zone.runOutsideAngular(() => {
      this.setupTooltip();
    });
  }

  private setupTooltip() {
    // tippy(this.el.nativeElement, {
    //   content(reference) => {
    //     const id = reference.getAttribute('data-template');
    //     const template = document.getElementById(id);
    //     return template.innerHTML;
    //   },
    //   allowHTML: true,
    // });
    // tippy(this.el.nativeElement, {
    //   content: '<strong>Bolded content</strong>',
    //   allowHTML: true,
    // });
    tippy(this.el.nativeElement, {
      content: 'Bazinga!',
    });
  }
}
