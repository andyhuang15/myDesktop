export interface OrderModel {
    _id?:string,
    BillId?: string,
    BillType: number,
    SupplierOrgId: string,
    SupplierOrgName?: string,
    DealerOrgId?: string,
    DealerOrgName?: string,
    CreateDate?: Date,
    TotalValue?: number,
    AuditState?: number,
    PayState?: number,
    ShipmentState?: number,
    IsDel?: boolean,
    Remark?: string,
    OwnerName?: string,
    OwnerId?: string,
    SourceWareHouseId?: string,
    SourceWareHouseName?: string,
    DestinationWareHouseId?: string,
    DestinationWareHouseName?: string,
    OrderItem?: OrderDetail[],
    isLocal?:boolean
}
 export interface OrderDetail extends UomModelForSubmit {
    BillId?: string,
    SeqNo: number,
    SupplierProductCode?: string,
    SupplierProductName?: string,
    SupplierProductSubCode?: string,
    SupplierProductSubDesc?: string,
    Price?: number,
    SettlementPrice?: number,
    Qty?: number,
    UomCode?: string,
    UomName?: string,
    TotalValue?: number,
    SettlementTotalValue?: number,
    ImgNormalUrl?: string,
    ImgSmallUrl?: string,
    ImgLargeUrl?: string,
    Barcode?: string,
    Inventory?: number,
    Specification?: string,
    MediumPrice?: number,
    MediumSettlementPrice?: number,
    MediumQty?: number,
    MediumUomCode?: string,
    MediumUomName?: string,
    MediumRate?: number,
    LargePrice?: number,
    LargeSettlementPrice?: number,
    LargeQty?: number,
    LargeUomCode?: string,
    LargeUomName?: string,
    LargeRate?: number,
    UomContent?: string
}
export interface UomModelDist {
    Price?: number,
    SettlementPrice?: number,
    Qty?: number,
    UomCode?: string,
    UomName?: string,
    MediumPrice?: number,
    MediumSettlementPrice?: number,
    MediumQty?: number,
    MediumUomCode?: string,
    MediumUomName?: string,
    MediumRate?: number,
    LargePrice?: number,
    LargeSettlementPrice?: number,
    LargeQty?: number,
    LargeUomCode?: string,
    LargeUomName?: string,
    LargeRate?: number,
}

export interface UomModelForSubmit extends UomModelDist {
    Price?: number,
    TotalValue?:number,
    SettlementTotalValue?:number
}
