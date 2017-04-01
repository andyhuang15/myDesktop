import { Injectable } from '@angular/core';
import {ProModel,UomModel} from '../model/pro-model';
import {OrderParamForRemote, ProModelForRemote} from '../model/submit-model';
// import {OrderDetail, OrderModel, UomModelForSubmit, WareHouseModel} from '../../db/index';
import {OrderDetail, OrderModel, UomModelForSubmit, WareHouseModel,UomModelDist} from '../../db/index';
@Injectable()
export class OrderAdapterService {

  constructor() { }
  public createSubmitModel (query:{totalvalue:number, defaultWarehouse:WareHouseModel, prolist:ProModel[]}) {
    let result:OrderModel = {
      BillId:new Date().getTime().toString(),
      BillType:1,
      SupplierOrgId:''
    };
    result.SupplierOrgName = '';
    result.DealerOrgId = '';
    result.DealerOrgName = '';
    result.CreateDate = new Date();
    result.TotalValue = query.totalvalue;
    result.Remark = '';

    result.SourceWareHouseId = query.defaultWarehouse.Id;
    result.SourceWareHouseName = query.defaultWarehouse.StoreName;
    result.OrderItem = this.createProductModelsForSubmit(result.BillId, result.CreateDate, query.prolist);
    return result;
  }
  public createSubmitModelForRemote (query: {
    defaultWarehouse:WareHouseModel,
    prolist:ProModel[],
    DealerOrgId: string,
    DealerOrgName:string,
    TotalValue: number,
    SettlementTotalValue:number,
    ShipmentAddress: string,
    ShipmentUserName: string,
    ShipmentUserPhone: string,
    SupplierOrgType: number,
    DealerOrgType: number,
    IsNeedDistribute: boolean,
  }):OrderParamForRemote {
    let param:OrderParamForRemote = {
      BillType: 1,
      DealerOrgId: query.DealerOrgId,
      DealerOrgName:query.DealerOrgName,
      SettlementTotalValue: query.SettlementTotalValue,
      ShipmentAddress: query.ShipmentAddress,
      ShipmentUserName: query.ShipmentUserName,
      ShipmentUserPhone: query.ShipmentUserPhone,
      SupplierOrgType: query.SupplierOrgType,
      DealerOrgType: query.DealerOrgType,
      IsNeedDistribute: query.IsNeedDistribute,
      SourceWareHouseType: query.defaultWarehouse.Type,
      SourceWareHouseId: query.defaultWarehouse.Id,
      SourceWareHouseName: query.defaultWarehouse.StoreName,
      ProductData:[],
      TotalValue: query.TotalValue
    };
    param.ProductData = query.prolist.map((pro, index) => {
       let result:ProModelForRemote = {
          ProductCode: pro.ProductCode,
          ID: ++index,
          ProductName: pro.Fullname,
          Amount: pro.Amount
       };
       return Object.assign(result, this.createUomModelForRemote(pro.UomList));
    })
    return param;
  }
  private createProductModelsForSubmit (billId:string, createDate:Date, pros:ProModel[]):OrderDetail[] {
    let prolist:OrderDetail[] = [];
    pros.forEach ((pro, index) => {
      let curPro:OrderDetail = {
        BillId:billId,
        SeqNo:++index
      };
      curPro.SupplierProductCode = pro.ProductCode;
      curPro.SupplierProductName = pro.Fullname;
      curPro.SupplierProductSubCode = pro.ProductSubCode;
      curPro.SupplierProductSubDesc = pro.AttrDesc;
      curPro.Barcode = pro.Barcode;
      curPro.Inventory = pro.Inventory;
      curPro.Specification = pro.Specification;
      curPro = Object.assign({},curPro, this.createUomModelsForSubmit(pro.UomList));
      prolist.push(curPro);
    });
    return prolist;
  }
  private createUomModelsForSubmit (uomList:UomModel[]):UomModelForSubmit {
    let UomModelForSubmit:UomModelForSubmit = {};
    let UomDist = this.createUomDist(uomList);
    UomModelForSubmit.TotalValue = UomDist.TotalValue;
    UomModelForSubmit.SettlementTotalValue = UomDist.SettlementTotalValue;
    UomModelForSubmit = Object.assign({}, UomModelForSubmit, UomDist.UomDist);
    return UomModelForSubmit;
  }
  private createUomModelForRemote (uomList:UomModel[]):UomModelDist {
    return this.createUomDist(uomList).UomDist;
  }
  private createUomDist (uomList:UomModel[])
                                              :{
                                                TotalValue:number,
                                                SettlementTotalValue:number,
                                                UomDist:UomModelDist
                                              }
  {
    let UomDist:UomModelDist = {};
    let totalvalue = 0;
    let settlementTotalValue = 0;
    uomList.forEach((uom,index)=> {
      totalvalue += uom.UomPrice * (uom.Quantity || 0);
      settlementTotalValue = (uom.SettlementPrice || uom.UomPrice) *  (uom.Quantity || 0);
      switch (index) {
        case 0:
          UomDist.UomName = uom.UomName;
          UomDist.UomCode = uom.UomCode;
          UomDist.Price = uom.UomPrice;
          UomDist.SettlementPrice = uom.SettlementPrice;
          UomDist.Qty = uom.Quantity;
          break;
        case 1:
          UomDist.MediumUomName = uom.UomName;
          UomDist.MediumUomCode = uom.UomCode;
          UomDist.MediumPrice = uom.UomPrice;
          UomDist.MediumSettlementPrice = uom.SettlementPrice;
          UomDist.MediumQty = uom.Quantity;
          UomDist.MediumRate = uom.UomRate;
          break;
        case 1:
          UomDist.LargeUomName = uom.UomName;
          UomDist.LargeUomCode = uom.UomCode;
          UomDist.LargePrice = uom.UomPrice;
          UomDist.LargeSettlementPrice = uom.SettlementPrice;
          UomDist.LargeQty = uom.Quantity;
          UomDist.LargeRate = uom.UomRate;
          break;
      }
    });
    return {
      TotalValue:totalvalue,
      SettlementTotalValue: settlementTotalValue,
      UomDist
    };
  }
}
