import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnDestroy,
  OnChanges,
  SimpleChange,
  DoCheck
} from '@angular/core';
import {KeyCodeService} from '../index';
const LEFT_ARROW = 37;
const RIGHT_ARROW = 39;
const UP_ARROW = 38;
const DOWN_ARROW = 40;
const ENTER = 13;
const SPACE = 32;
const CTRL = 17;
const DEL = 46;
const ESC = 27;
interface keyEv extends Event {
  keyCode:number
}
interface dirChange  {
  [propKey: string]: SimpleChange,
  stopListen:SimpleChange
}
@Directive({
  selector: '[appKeycodeListen]'
})
export class KeycodeListenDirective implements OnDestroy, OnInit, OnChanges, DoCheck {
  @Input() listenId = '0';
  @Input() priority = 0;
  @Input() stopListen = false;
  @Output() onArrowDown = new EventEmitter();
  @Output() onArrowUp = new EventEmitter();
  @Output() onArrowLeft = new EventEmitter();
  @Output() onArrowRight = new EventEmitter();
  @Output() onEnter = new EventEmitter();
  @Output() onSpace = new EventEmitter();
  @Output() onDel =  new EventEmitter();
  @Output() onEsc = new EventEmitter();
  private isInit = false;
  private keycodeSvr:KeyCodeService =  KeyCodeService.init();
  private hasAddListen = false;
  constructor() {

  }
  ngOnInit() {
    this.isInit = true;
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    console.log('init', this.listenId);
    if (this.stopListen) {
      return;
    }
    this.initKeyCodeListen();

  }
  ngOnChanges(changes: dirChange) {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add 'implements OnChanges' to the class.
    // for (let key in changes) {
    //   if (key === 'stopListen' && changes[key].currentValue) {
    //     this.removeKeyCodeListen();
    //   }
    // }
    if (!this.isInit) {
      return;
    }
    if (!changes.stopListen) {
      return;
    }
    if (changes.stopListen.currentValue ) {
        this.removeKeyCodeListen();
    } else if (!this.hasAddListen){
      this.initKeyCodeListen();
    }
  }
  ngDoCheck() {
    // console.log('check');
    //Called every time that the input properties of a component or a directive are checked. Use it to extend change detection by performing a custom check.
    //Add 'implements DoCheck' to the class.

  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.removeKeyCodeListen();
  }
  initKeyCodeListen () {
    this.hasAddListen = true;
    let self = this;
    this.keycodeSvr.add({
      id: self.listenId,
      priority:self.priority,
      cb: function (ev) {
        console.log(ev);
        setTimeout ( () => {
          switch (ev.keyCode) {
            case LEFT_ARROW:
              self.onArrowLeft.emit();
              break;
            case RIGHT_ARROW:
              self.onArrowRight.emit();
              break;
            case UP_ARROW:
              self.onArrowUp.emit();
              break;
            case DOWN_ARROW:
              self.onArrowDown.emit();
              break;
            case ENTER:
              self.onEnter.emit();
              break;
            case SPACE:
              self.onSpace.emit();
              break;
            case DEL:
              self.onDel.emit();
              break;
            case ESC:
              self.onEsc.emit();
              break;
            default:
              break;
          }
        })

      }

    });
    // this.keycodeSvr.init();
  }
  removeKeyCodeListen () {
    this.keycodeSvr.remove(this.listenId);
    this.hasAddListen = false;
  }
}
