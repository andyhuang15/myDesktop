import { ProModel } from './pro-model';
import {UomModelDist} from '../../db/index';
export interface ProForSubmit extends ProModel {
  ID: number,
  ProductName: string,
  IsAllowDecimal: boolean,
  LargePrice?: number,
  LargeQty?: number,
  LargeRate?: number,
  LargeSettlementPrice?: number,
  LargeUomCode?: string,
  LargeUomName?: string,
  MediumUomName?: string,
  MediumUomCode?: string,
  MediumPrice?: number,
  MediumSettlementPrice?: number,
  MediumRate?: number,
  MediumQty?: number
}
export interface SubmitModel {
  DealerOrgName: string,
  IsNeedDistribute: boolean
  OwnerId: string, //"f2426ff1-5188-49e7-8a58-9439529c26b3"
  OwnerName: string, //"测试账号"
  ProductData: ProForSubmit[],
  SettlementTotalValue: number,
  SourceWareHouseId: string,
  SourceWareHouseName: string,//"1号仓库"
  SourceWareHouseType: number,
  SupplierOrgType: number,
  TotalValue: number
}
export interface ProModelForRemote extends UomModelDist {
  "ProductCode": string,
  "ID": number,
  "ProductName": string,
  "Amount": number,
}
export interface OrderParamForRemote {
  "BillType": 1,
  "DealerOrgId": string,
  "ProductData":ProModelForRemote[],
  "SettlementTotalValue": number,
  "TotalValue": number,
  "ShipmentAddress": string,
  "ShipmentUserName": string,
  "ShipmentUserPhone": string,
  "SupplierOrgType": number,
  "DealerOrgType": number,
  "DealerOrgName":string,
  "IsNeedDistribute": boolean,
  "SourceWareHouseType": number,
  "SourceWareHouseId": string,
  "SourceWareHouseName": string
}
