import
  {Component, OnInit ,Input,
  Output,
  EventEmitter,} from '@angular/core';

@Component({
  selector: 'app-page-nav',
  templateUrl: './page-nav.component.html',
  styleUrls: ['./page-nav.component.scss']
})
export class PageNavComponent implements OnInit {
  @Input () pages = 0;
  @Input () curPage = 1;
  @Output() onNext = new EventEmitter<number>();
  @Output() onPrev = new EventEmitter<number>();
  constructor() { }

  ngOnInit() {
  }
  next () {
    this.curPage = Math.min(++this.curPage, this.pages);
    this.onNext.emit(this.curPage);
  }
  prev () {
    this.curPage = Math.max(--this.curPage, 1);
    this.onNext.emit(this.curPage);
  }
}
