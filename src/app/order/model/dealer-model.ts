export interface DealerModel {
  OrgId: string,
  ClassName?: string,
  AreaName?: string,
  DealerName?: string,
  DealerNum?: string,
  DealerOrgId?:string,
  //DealerOrgName: string,
  DealerOrgType?: number,
  DealerRemarkName: string,
  IsCanCredit?: boolean,
  IsRetailClient?: boolean,
  OwnerId?: string,
  OwnerName?:string
}

export interface HistoryPriceModel { 
  ProductCode: string,
  
  UomModels?:LargeUomModel[]
}

interface LargeUomModel { 
  UomName?: string,
  UomCode?: string,
  UomPrice?: number,
  UomCostPrice?: number,
  UomRate?: number,
  UomLevel?: number,
  Barcode?:string,
}
