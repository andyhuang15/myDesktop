import { Component, OnInit } from '@angular/core';
import {OrderService, BIllItem, BillDetail} from '../service/index';
@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  private billList:BIllItem[] = [];
  private curBill:BillDetail ;
  private curPage = 1;
  private totalRows = 0;
  private pages = 0;
  private readonly PAGE_SIZE = 20;
  private isFirst = true;
  constructor(private orderSvr:OrderService) { }

  ngOnInit() {
    this.getBillList();
  }
  getDetail (BillId:string) {
    this.orderSvr.getBillDetail(BillId).then(res => this.curBill = res);
  }
  getBillList () {
    this.orderSvr.getBillList({CurPage: this.curPage}).then(result => {
      this.totalRows = result.totalRows;
      this.getPages();
      // this.billList = this.billList.concat(result.data);
      this.billList = (result.data);
      if (this.isFirst) {
        return this.billList[0].BillId;
      }
    }).then(BillId => {
      if (BillId) {
        this.getDetail(BillId);
      }
      this.isFirst = false;
    });
  }
  getPages () {
    this.pages = Math.ceil(this.totalRows/this.PAGE_SIZE);
  }
  nextPage (page) {
    this.curPage = page;
    //this.curPage = Math.min(this.pages, ++ this.curPage);
    this.getBillList();
  }
  prevPage (page) {
    this.curPage = page;
    // this.curPage = Math.max(1, -- this.curPage);
    this.getBillList();
  }
}
