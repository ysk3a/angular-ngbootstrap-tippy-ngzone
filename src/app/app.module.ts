import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {MaterialExampleModule} from '../material.module';
import {TooltipOverviewExample} from './tooltip-overview-example';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatNativeDateModule} from '@angular/material/core';
import {HttpClientModule} from '@angular/common/http';
import { NgbModule, NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { TooltipDirective } from './tooltip.directive';
import { ClickZonelessDirective } from './click-zoneless.directive';
import { Tippy1Directive } from './tippy1.directive';
import { Tippy2Directive } from './tippy2.directive';
// import { Tippy3Directive } from './tippy3.directive';

@NgModule({
  declarations: [TooltipOverviewExample, TooltipDirective, ClickZonelessDirective, Tippy1Directive, Tippy2Directive],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialExampleModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPopoverModule
  ],
  bootstrap: [TooltipOverviewExample],
})
export class AppModule {}
