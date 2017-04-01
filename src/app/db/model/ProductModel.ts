export interface ProductModel {
  _id?:string,
  ProductCode?:string,
  Fullname?:string,
  AttrDesc?:string,
  UomName?:string,
  UomCode?:string,
  SalePrice?:number,
  ProductSubCode?:string,
  ProductSubName?:string,
  DiscountPrice?:Number,
  OrgId?:string,
  Barcode?:string
  BuyPrice?:number
  MarketingName?:string
  ImgUrl?:string
  IsAllowDecimal? :boolean,
  Inventory?:number,
  ExFactoryDate?:Date,
  Specification?: string,
  UomLevel?: number,
  UomList? :ProductUomModels[]
}

export interface ProductUomModels {
  OrgId:string,
  ProductCode:string,
  UomCode?:string,
  UomLevel?:number,
  UomName?:string,
  UomPrice?:number,
  UomCostPrice?:number,
  UomRate?:number,
  Standard?:string,
  Barcode?:string,
  Remark?:string,
  DecimalCount?:number,
  UomDiscountPrice?:number,
  Quantity?:number
}
