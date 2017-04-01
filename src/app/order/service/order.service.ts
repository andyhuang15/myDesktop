import { Injectable } from '@angular/core';
import {YbHttpService, respData} from '../../shared/yb-http.service';
import {ProModel} from '../model/pro-model';
import {MdSnackBar} from '@angular/material';
import {SubmitModel} from '../model/submit-model';
import {OrderDetail, OrderModel, OutProduct} from '../../db/index';
import {OrderParamForRemote} from '../model/submit-model';
export interface BillQuery {
    BillId?:number
    BillState?:number
    BillType?:number
    CurPage?:number
    DealerName?:string
    OwnerName?:string,
    PageSize?:number,
    EndTime?:Date,
    StartTime?:Date
}
export interface BIllItem {
  AuditState:number,
  BillId:string,
  BillType?:number
  CreateDate:string,
  DealerOrgId:string,
  DealerOrgName:string,
  IsDel:boolean,
  OwnerId:string,
  OwnerName:string,
  PayState:number
  ShipmentState:number,
  SourceWareHouseId:string,
  SourceWareHouseName:string,
  SupplierOrgId:string,
  SupplierOrgName :string,
  TotalValue : number
}

export interface BillDetail extends BIllItem{
  PayWay: number,
  IsNeedDistribute:boolean,
  IsCanEdit: boolean,
  SourceWareHouseType:number,
  listObject: BillProModel[],
}
export interface BillProModel  {
  "ID": number,
  "ProductName": string,
  "UomName": string,
  "Qty": number,
  "Amount": number,
  "SettlementPrice": number,
  "Price": number,
  "UomRate": number,
  "ProductCode": string,
  "UomCode": string,
  "Barcode": string,
  "ImgNormalUrl": string,
  "ImgSmallUrl": string,
  "ImgLargeUrl": string,
  "DecimalCount": number,
  "Inventory": number,
  "MediumUomName": string,
  "MediumQty": number,
  "MediumUomCode": string,
  "MediumSettlementPrice": number,
  "MediumPrice": number,
  "MediumRate": number,
  "LargeQty": number,
  "LargeSettlementPrice": number,
  "LargePrice": number,
  "LargeRate": number,
  "UomContent": string
}
interface BillListResult {
  data:BIllItem[],
  totalRows:number
}
@Injectable()
export class OrderService {

  constructor(
    private ybHttp:YbHttpService,
    private toast:MdSnackBar,
    private dbSvr: OutProduct
  ) { }
  getOrderList (query:BillQuery):Promise<BillListResult> {
    return new Promise((resolve, reject) => {
      this.ybHttp.get('Order/GetOrderList', query).then(res => {
        res.data as BIllItem[];
        resolve(res as BillListResult);
      })
    });
  }
  getBillDetail (BillId:string):Promise<BillDetail> {
    return new Promise((resolve, reject) => {
      this.ybHttp.get('Purchase/GetOrderInfo',{BillId}).then(res => resolve(res as BillDetail));
    });
  }
  getBillList (query:BillQuery):Promise<BillListResult> {
    let defaultQuery = {
      BillType: 1,
      PageSize: 20
    };
    return this.getOrderList(Object.assign(query, defaultQuery));
  }
  getReturunList () {

  }
  submit (param:OrderModel):Promise<any> {
    return new Promise((resolve, reject) => {
      this.dbSvr.addOrders([param]).then(
        results => {
          let hasErr = false;
          for (let i = 0; i < results.length; i++) {
            if(!results[i].ok) {
              hasErr = true;
              break;
            }
          }
          if (hasErr) {
            this.toast.open('订单添加失败','确定', {duration: 2000});
            return reject('插入失败');
          }
          this.toast.open('订单添加成功','确定', {duration: 2000});
          resolve('插入成功');

        },
        err => reject('插入失败')
      );
    });
  }
  submitRemote (param:OrderParamForRemote):Promise<string> {
    return new Promise((resolve, reject) => {
      this.ybHttp.post('Sales/SubmitWithSettle',param).then(
        result => {
          debugger;
          result as any[];
          console.log(result);
          this.toast.open('订单添加成功','确定', {duration: 2000});
          resolve(result[0].BillId);
        }
      )
    });
  }
}
