import {
  Component,
  Input,
  trigger,
  state,
  style,
  transition,
  animate,
  OnInit,
  Output,

  EventEmitter
} from '@angular/core';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('modalState', [
      state('hide', style({
        transform: 'translate3d(0, 100%,0) scale(0)',
        opacity: 0
      })),
      state('show', style({
        transform: 'translate3d(0, 0,0) scale(1)',
        opacity: 1
      })),
      transition('hide => show',animate('350ms ease-in')),
      transition('show => hide',animate('350ms ease-out')),
    ])
  ]
})
export class ModalComponent implements OnInit {
  private state:string = 'hide';
  @Output() isShowChange = new EventEmitter<boolean>();
  @Output() modalHide = new EventEmitter<boolean>();
  @Input() isShow:boolean = false;
  // private state:string = 'hide';
  constructor() { }
  ngOnInit() {
  }
  ngOnChanges (change) {
    this.state = this.isShow ? 'show' : 'hide';
  }
  hide () {
    this.isShow = false;
    this.state = 'hide';
    this.isShowChange.emit(this.isShow);
    this.modalHide.emit(this.isShow);
  }
}
