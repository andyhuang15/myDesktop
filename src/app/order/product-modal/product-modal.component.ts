import { Component, OnInit ,Input, Output, EventEmitter, SimpleChange} from '@angular/core';
import {ProductSvrService} from '../service/product-svr.service';
import {ProModel} from '../model/pro-model';
import {OutProduct} from '../../db'
@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss']
})
export class ProductModalComponent implements OnInit {
  @Input() isShow: boolean = false;
  @Input() queryStr: string = '';
  @Input() resultList:ProModel[] = [];
  @Output() onQueryChange = new EventEmitter<string>();
  @Output() onProSelected = new EventEmitter<ProModel>();
  @Output() isShowChange = new EventEmitter<boolean>();
  // private stopListen = true;
  private cursorIndex = 0;
  // private resultList:ProModel[] = [];
  constructor(private prosvr:OutProduct) { }

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
  onProClick (pro:ProModel) {
    this.onProSelected.emit(pro);
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
    this.onProClick(this.resultList[this.cursorIndex]);
  }
}
