import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ProModel, UomModel } from '../model/pro-model';
import { DealerModel } from '../model/dealer-model';
import { SubmitModel } from '../model/submit-model';
import { OrderService } from '../service/order.service';
import { PrintService, orderInfo } from '../../lodop';
import { WareHouseModel, LocalDataService } from '../../db/index';
import { WarehouseService, ShopcartService, OrderAdapterService } from '../service/index';

@Component({
  selector: 'app-settle-order',
  templateUrl: './settle-order.component.html',
  styleUrls: ['./settle-order.component.scss']
})
export class SettleOrderComponent implements OnInit {
  private prolist: ProModel[] = [];
  private dealerInfo: DealerModel;
  private SettlementTotalValue: number = 0;
  private TotalValue: number = 0;
  private defaultWarehouse: WareHouseModel;
  private isOk = false;
  private BillId = '';
  constructor(
    private route: Router,
    private shopcart: ShopcartService,
    private warehouseSvr: WarehouseService,
    private orderAdapter: OrderAdapterService,
    private location: Location,
    private printSvr: PrintService,
    private localSvr: LocalDataService,
    private orderSvr: OrderService) { }

  ngOnInit() {
    this.prolist = this.shopcart.getList();
    this.dealerInfo = this.shopcart.getDealer();
    this.SettlementTotalValue = this.TotalValue = this.getTotal(this.prolist);
    this.warehouseSvr.getDefaultWareHouse()
      .then(res => this.defaultWarehouse = res);
  }
  back() {
    this.location.back();
  }
  submitOrder() {
    let self = this;
    let param = this.orderAdapter.createSubmitModel({
      totalvalue: self.TotalValue,
      defaultWarehouse: self.defaultWarehouse,
      prolist: self.prolist
    });
    this.back();
  }
  submitOrderForRemote() {
    if (!this.isOk) {
      this.isOk = true;
      return;
    }

    let self = this;
    let param = this.orderAdapter.createSubmitModelForRemote({
      TotalValue: self.TotalValue,
      SettlementTotalValue: self.SettlementTotalValue,
      prolist: self.prolist,
      DealerOrgId: this.dealerInfo ? this.dealerInfo.DealerOrgId : '',
      DealerOrgName: this.dealerInfo ? this.dealerInfo.DealerRemarkName : '',
      ShipmentAddress: '',
      ShipmentUserName: '',
      ShipmentUserPhone: '',
      SupplierOrgType: 0,
      DealerOrgType: this.dealerInfo ? this.dealerInfo.DealerOrgType : 2,

      IsNeedDistribute: false,
      defaultWarehouse: self.defaultWarehouse
    });
    this.orderSvr.submitRemote(param).then(res => {
      this.BillId = res;
      // this.back();
    })
  }
  getTotal(prolist: ProModel[]): number {
    var sum = 0;
    var index = 0;
    prolist.forEach(pro => {
      index++;
      pro.ID = index;
      sum += pro.Amount;
    });
    return sum;
  }
  print() {
    let self = this;
    let userInfo = this.localSvr.getUserInfo();
    let TotalQty = 0;
    this.prolist.forEach(pro => {
      pro.UomList.forEach(Uom => {
        TotalQty += Uom.Quantity;
      });
    });
    debugger;
    this.printSvr.sendOrderInfos([{
      // BillId: this.BillId,
      BillId: '1135454545',
      BillType: 1,
      CreatDate: '',
      CreatUserName: userInfo.UserName,
      DealerOrgName: this.dealerInfo ? this.dealerInfo.DealerRemarkName : '',
      TotalValue: self.TotalValue,
      SettlementValue: self.SettlementTotalValue,
      TotalQty: TotalQty,
      OrderItem: [{
        "Barcode": "6923555210462",
        "UomContent": "1箱",
        "SeqNo": 1,
        "SupplierProductName": "汇源1L100%苹果汁",
        "Uom": "箱",
        "Price": "140.00",
        "AllQty": "1",
        "TotalValue": 140,
        "SettlementPrice": 140,
        "SettlementTotalValue": 140
      },
      {
        "Barcode": "6923555210455",
        "UomContent": "1箱",
        "SeqNo": 2,
        "SupplierProductName": "汇源1L100%橙汁",
        "Uom": "箱",
        "Price": "140.00",
        "AllQty": "1",
        "TotalValue": 140,
        "SettlementPrice": 140,
        "SettlementTotalValue": 140
      }
      ]
    }]);
    this.printSvr.print();
  }
}
