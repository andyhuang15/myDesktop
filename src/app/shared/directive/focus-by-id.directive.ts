import { Directive,ElementRef, Input } from '@angular/core';
import {EvBusService} from '../service/ev-bus.service';
@Directive({
  selector: '[appFocusById]'
})
export class FocusByIdDirective {

  constructor(el: ElementRef, private evBus:EvBusService) {
    let oEl = el.nativeElement;
    let curId = oEl.getAttribute('appFocusById');
    this.evBus.$on('focusById', (id) => {
      if (id === curId) {
        oEl.focus();
      }
    });
  }

}
