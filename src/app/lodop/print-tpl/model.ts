export interface orderInfo  {
        BillId: string,
        CreatDate: string,
        BillType: number,
        CreatUserName: string,
        DealerOrgName: string,
        TotalValue: number,
        SettlementValue: number,
        TotalQty: number,
        OrderItem:OrderItem[]
}
interface OrderItem{
    Barcode: string,
    UomContent: string,
    SeqNo: number,
    SupplierProductName: string,
    Uom: string,
    Price: string,
    AllQty: string,
    TotalValue: number,
    SettlementPrice: number,
    SettlementTotalValue: number
}
export interface templateInfo {
  setFontSize: number,
  headMsg: string,
  FixedLine: any[],
  IsNote: boolean,
  footMsg: string
}
export interface tableHead {
  Name: string,
  DisplayName: string,
  Width: string,
  IsShow: true,
  TdData: string,
  textStyle: string
}
export interface printSetting {
  Name: string,
  Type: string,
  Interface: string,
  TemplateUrl: string,
  TableHead: tableHead[]
}
