import { ElementRef, Injectable, NgZone, OnInit } from '@angular/core';
import tippy from 'tippy.js';

@Injectable({
  providedIn: 'root',
})
export class TippyWrapperService {
  constructor(private readonly zone: NgZone) {}

  createPopover(target: Element, popoverContent: string): TippyWrapperInstance {
    if (!target) {
      throw new Error('Target element for the popover is not defined');
    }
    return tippy(target, this.getTippyOptions(popoverContent));
  }
  // ngOnInit() {
  // this.setupTooltip();
  // this.zone.runOutsideAngular(() => {
  //   this.createPopover();
  // });
  // }
  private getTippyOptions(popoverContent: string) {
    // see full documentation here: https://atomiks.github.io/tippyjs/v6/all-props/
    const tippyOptions = {
      content: this.getContentFinal(popoverContent),
      allowHTML: true,

      // Theming. see: https://atomiks.github.io/tippyjs/v6/themes/
      // The light theme is imported from the angluar.json file
      // with "./node_modules/tippy.js/themes/light.css"
      // theme: "light",

      // only programmatically trigger it
      trigger: 'manual',

      // never hide upon clicking
      hideOnClick: false,

      // Animation. see: https://atomiks.github.io/tippyjs/v6/animations/
      // The scale animation is imported from the angluar.json file
      // with "./node_modules/tippy.js/animations/scale.css"
      theme: 'light-border',
      animation: 'scale',

      // with close button
      // interactive: true,
      // onShown(instance) {
      //   instance.popper
      //     .querySelector(`#close-popover`)
      //     .addEventListener("click", () => {
      //       instance.hide();
      //     });
      // },
      // onHide(instance) {
      //   instance.popper
      //     .querySelector(`#close-popover`)
      //     .removeEventListener("click", () => {
      //       instance.hide();
      //     });
      // }
    };
    return tippyOptions;
  }

  private getContentFinal(popoverContent: string) {
    return `${popoverContent}`;
  }

  showPopover(instance: any) {
    if (instance.popoverIsShown) {
      return;
    }
    instance.show();
    instance.popoverIsShown = true;
  }

  togglePopover(instance: any) {
    if (instance.popoverIsShown) {
      this.hidePopover(instance);
    } else {
      this.showPopover(instance);
    }
  }

  hidePopover(instance: any) {
    if (!instance.popoverIsShown) {
      return;
    }
    instance.hide();
    instance.popoverIsShown = false;
  }
}

interface TippyWrapperInstance {
  popoverIsShown?: boolean;
  hide: () => void;
  show: () => void;
  destroy: () => void;
}
