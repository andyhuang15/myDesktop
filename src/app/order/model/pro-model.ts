import {ProductModel, ProductUomModels} from '../../db/model/ProductModel';
export interface hasUomList {
  UomList: UomModel[]
}
export interface ProModel extends ProductModel {
  ID?:number,
  ChineseFirstLetter?:string, //ZYGHPTJJSPY750ML,
  Quantity?: number,
  Amount?:number,
  SettlementPrice?:number
}
export interface UomModel extends ProductUomModels{
  Quantity?:number,
  SettlementPrice?:number
}
