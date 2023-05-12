import { AfterViewChecked, AfterViewInit, Component, ElementRef, NgZone, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { fromEvent } from 'rxjs';
import { TippyWrapperService } from './tippy-wrapper.service';
/**
 * @title Basic tooltip
 */
@Component({
  selector: 'tooltip-overview-example',
  templateUrl: 'tooltip-overview-example.html',
})
export class TooltipOverviewExample implements OnInit, OnDestroy, AfterViewInit, AfterViewChecked {
  name = 'world';
  @ViewChild('btn') btnEl: ElementRef<HTMLButtonElement>;
  buttonPopover: any;

  popoverContent = '<strong>Bolded content</strong>';
  constructor(private tippyWrapperService: TippyWrapperService, private readonly zone: NgZone, private readonly renderer: Renderer2) {}

  onClick() {
    console.log('onClick');

    // this.zone.runOutsideAngular(() => {
    //   console.log("onClick");
    // });
  }
  ngOnInit() {
    const target = document.querySelector('#button-target');
    this.buttonPopover = this.tippyWrapperService.createPopover(target as Element, this.popoverContent);
  }

  toggleButtonPopover() {
    this.tippyWrapperService.togglePopover(this.buttonPopover);
  }

  ngOnDestroy() {
    this.buttonPopover.destroy();
  }

  ngAfterViewInit() {
    this.setupClickListener();
  }

  ngAfterViewChecked() {
    console.log('CD performed');
  }

  private setupClickListener() {
    // this.setupClickListenerViaNativeAPI();
    // this.setupClickListenerViaRenderer();
    // this.setupClickListenerViaRxJS();

    this.zone.runOutsideAngular(() => {
      // this.setupClickListenerViaNativeAPI();
      // this.setupClickListenerViaRenderer();
      this.setupClickListenerViaRxJS();
    });
  }

  private setupClickListenerViaNativeAPI() {
    this.btnEl.nativeElement.addEventListener('click', () => {
      console.log('onClick');
    });
  }

  private setupClickListenerViaRenderer() {
    this.renderer.listen(this.btnEl.nativeElement, 'click', () => {
      console.log('onClick');
    });
  }

  private setupClickListenerViaRxJS() {
    fromEvent(this.btnEl.nativeElement, 'click').subscribe(() => {
      console.log('onClick');
    });
  }
}

/**  Copyright 2023 Google LLC. All Rights Reserved.
    Use of this source code is governed by an MIT-style license that
    can be found in the LICENSE file at https://angular.io/license */
