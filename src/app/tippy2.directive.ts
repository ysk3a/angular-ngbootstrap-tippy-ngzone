import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import tippy, { Instance, Props } from 'tippy.js';

@Directive({
  selector: '[appTippy2]'
})
// @Directive({ selector: '[tooltip],[tooltipOptions]' })
export class Tippy2Directive implements OnDestroy, AfterViewInit, OnChanges {
  constructor(private readonly el: ElementRef) {}

  private instance: Instance<Props> = <Instance<Props>>{};

  @Input() tooltip: string;
  @Input() tooltipOptions: Partial<Props>;

  ngAfterViewInit() {
    this.instance = tippy(this.el.nativeElement as Element, {});
    this.updateProps({
      ...(this.tooltipOptions ?? {}),
      content: this.tooltip,
    });
  }

  ngOnDestroy() {
    this.instance?.destroy();
    this.instance = <Instance<Props>>{};
  }

  ngOnChanges(changes: SimpleChanges) {
    let props = {
      ...(this.tooltipOptions ?? {}),
      content: this.tooltip,
    };

    if (changes.tooltipOptions) {
      props = {
        ...(changes.tooltipOptions.currentValue ?? {}),
        content: this.tooltip,
      };
    }
    if (changes.tooltip) {
      props.content = changes.tooltip.currentValue;
    }

    this.updateProps(props);
  }

  private updateProps(props: Partial<Props>) {
    if (this.instance && !jsonEqual<any>(props, this.instance.props)) {
      this.instance.setProps(this.normalizeOptions(props));
      if (!props.content) {
        this.instance.disable();
      } else {
        this.instance.enable();
      }
    }
  }

  private normalizeOptions = (props: Partial<Props>): Partial<Props> => ({
    ...(props || {}),
    duration: props?.duration ?? [50, 50],
  });
}
export const jsonEqual = <T>(aa: T, bb: T): boolean =>
  JSON.stringify(aa) === JSON.stringify(bb);
