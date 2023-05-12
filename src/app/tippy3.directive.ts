import { Directive, ElementRef, Input, OnInit, OnChanges, ChangeDetectorRef } from '@angular/core';
import tippy, { Instance,Props } from 'tippy.js'
@Directive({
  selector: '[appTippy3]'
})
export class Tippy3Directive  implements OnInit, OnChanges {

  @Input() options: object = {};
  @Input() title: any = '';

  public _el: any;
  public _host: any;
  public instance: Instance<Props>[];

  constructor(el: ElementRef, public ref: ChangeDetectorRef) {
    this._el = el.nativeElement;
    this._host = el.nativeElement;
  }


  ngOnInit() {
    let commonOption = { 'arrow': true, "inertia": true, "animation": "perspective" };
    let contentTitle = { content: this.title };
    this.options = Object.assign(commonOption, this.options, contentTitle);

    this.detectHostNode();

    if (this.options.hasOwnProperty("html")) {
      const template = document.getElementById(this.options['html'])
      delete this.options['html']
      this.options['content'] = template.innerHTML;
      this.instance = tippy(this._el,
        this.options
      )
    }

    else {
      this.instance = tippy(this._el,
        this.options
      )
    }
  }

  ngOnChanges() {
    let commonOption = { 'arrow': true, "inertia": true, "animation": "perspective" };
    let contentTitle = { content: this.title };
    this.options = Object.assign(commonOption, this.options, contentTitle);

    this.detectHostNode();

    if (this.options.hasOwnProperty("dynamic")) {
      delete this.options['dynamic'];
      
      this._el.addEventListener('mouseover', function () {
       
        var titleText = this.getAttribute('data-tippy')
       
        tippy(this, { content: titleText })
        this._tippy.setContent(titleText)
      });
    }

    else if (this.options.hasOwnProperty("html")) {
      const template = document.getElementById(this.options['html'])
      delete this.options['html']
      this.options['content'] = template.innerHTML

      this.instance = tippy(this._el,
        this.options
      )
    }

    else {
      this.instance = tippy(this._el,
        this.options
      )
    }
  }

  // Re-create the tooltip on changes

  // Detects if the directive is placed on an angular component
  // host node. The tooltip will not display correctly, so
  // instead we will transfer all data-attributes and title to the first
  // child of the component.
  detectHostNode() {
    const attrs = this._el.attributes;

    let hostNode = false;
    for (let i = 0; i < attrs.length; i++) {
      if (attrs[i].name.indexOf('_nghost') > -1) {
        hostNode = true;
      }
    }

    if (hostNode && this._el.children.length > 0) {
      this._el = this._el.children[0];
      this.xferAttributes(this._host, this._el);
    }
  }

  // If we are transfering the tooltip from the host component
  // node to the first child node, we'll need to copy all the data attributes
  xferAttributes(fromEl: HTMLElement, toEl: HTMLElement) {
    const daList = [
      'position',
      'trigger',
      'interactive',
      'interactiveborder',
      'delay',
      'animation',
      'arrow',
      'arrowsize',
      'animatefill',
      'duration',
      'html',
      'size',
      'distance',
      'theme',
      'offset',
      'hideonclick',
      'multiple',
      'followcursor',
      'inertia',
      'flipduration',
      'sticky',
      'stickyduration',
      'appendto',
      'zindex',
      'touchhold',
      'performance',
      'dynamictitle',
      'popperoptions'
    ];

    // Copy data attributes from the input element to the target element
    daList.forEach(da => {
      if (fromEl.dataset[da]) {
        toEl.dataset[da] = fromEl.dataset[da];
      }
    });

    if (fromEl.hasAttribute('title')) {
      toEl.title = fromEl.title;
      fromEl.title = '';
    }
  }
}
