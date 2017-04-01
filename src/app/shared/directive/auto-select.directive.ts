import { Directive, ElementRef , OnInit, OnDestroy} from '@angular/core';

@Directive({
  selector: '[appAutoSelect]'
})
export class AutoSelectDirective implements OnInit, OnDestroy {
  private oEle:HTMLInputElement;
  constructor(private eleRef:ElementRef) {
    this.oEle = this.eleRef.nativeElement;
  }
  ngOnInit() {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.oEle.addEventListener('click', this.autoSelect.bind(this));
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.oEle.removeEventListener('click', this.autoSelect.bind(this));
  }

  autoSelect () {
    this.oEle.select();
  }
}
