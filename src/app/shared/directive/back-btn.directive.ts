import { Directive, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
@Directive({
  selector: '[appBackBtn]'
})
export class BackBtnDirective {

  constructor(private eleRef:ElementRef, private loation:Location) {
    let oEl:Element = this.eleRef.nativeElement;
    oEl.addEventListener('click', ev => this.loation.back());
  }

}
