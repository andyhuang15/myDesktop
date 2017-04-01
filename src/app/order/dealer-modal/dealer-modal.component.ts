import { Component, OnInit, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import {DealerModel} from '../model/dealer-model'

@Component({
  selector: 'app-dealer-modal',
  templateUrl: './dealer-modal.component.html',
  styleUrls: ['./dealer-modal.component.scss']
})
export class DealerModalComponent implements OnInit {

  @Input() isShow: boolean = false;
  @Input() queryStr: string = '';
  @Input() resultList:DealerModel[] = [];
  @Output() onQueryChange = new EventEmitter<string>();
  @Output() onDealerSelected = new EventEmitter<DealerModel>();
  @Output() isShowChange = new EventEmitter<boolean>();
  // private stopListen = true;
  private cursorIndex = 0;
  // private resultList:ProModel[] = [];
  //constructor(private prosvr:OutProduct) { }

  ngOnInit() {
  }
  ngOnChanges(changes: {[propKey: string]: SimpleChange}) {
    this.isShowChange.emit(this.isShow);
    for (let key in changes) {
      if (key === 'isShow' && typeof this.cursorIndex!== 'undefined') {
        this.cursorIndex = 0;
      }
    }
  }
  modalHide () {
    this.isShow = false;
    this.isShowChange.emit(this.isShow);
  }
  search () {

    this.onQueryChange.emit(this.queryStr);
  }
  onDealerClick(dealer: DealerModel) {
    this.onDealerSelected.emit(dealer);
    this.modalHide();
  }
  onArrowDown () {
     this.cursorIndex ++;
     this.cursorIndex = Math.min(this.resultList.length - 1, this.cursorIndex);
  }
  onArrowUp () {
    this.cursorIndex --;
    this.cursorIndex = Math.max(0, this.cursorIndex);
  }
  onEnter () {
    // this.onProSelected.emit(this.resultList[this.cursorIndex]);
    this.onDealerClick(this.resultList[this.cursorIndex]);
  }

}
