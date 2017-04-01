import { Injectable } from '@angular/core';
import { YbHttpService, respData } from '../../shared/yb-http.service';
import { ProductModel } from '../model/ProductModel';
import { OrderModel } from '../model/OrderModel';
import { PrintTemplateModel } from '../model/PrintTemplateModel';
import { ProductSvrService } from '../service/product.service';
import { findProductCount, findLimitProductInfo, findOrderCount, findLimitOrderInfo, findProductUom, allDocs, findPrintTemplat } from '../db';
interface productQuery {
    CurPage?: number,
    PageSize?: number,
    KeyWord?: string
}
interface orderQuery {
    BillId?: string,
    BillType?: number,
    DealerOrgName?: string,
    AuditState?: number,
    PayState?: number,
    ShipmentState?: number,
    StartTime?: Date,
    EndTime?: Date,
    OwnerName?: string,
    SourceWareHouseId?: string,
    DestinationWareHouseName?: string,
    CurPage?: number,
    PageSize?: number
}
@Injectable()
export class OutProduct {
    // private proList:ProductModel[] = [];
    constructor(private proSvr: ProductSvrService) {

    }
    upDate() {
        return Promise.all([
            this.proSvr.getPro({}),
            this.proSvr.getPrintTemplate({})
            //this.proSvr.getOrder({})
        ]).then(result => {
            if (result.length > 0) {
                return true;
            }
        });
    }
    selectProduct(query: productQuery) {
        console.log(query);
        var regExp = new RegExp('.*' + query.KeyWord + '.*', 'i');
        let param: any = {
            _id: { $gte: null, "$regex": 'productInfo' },
            $or: [
                { ProductCode: { "$regex": regExp } },
                { Fullname: { "$regex": regExp } },
                { Barcode: { "$regex": regExp } },
                { ChineseFirstLetter: { "$regex": regExp } }
            ]

        };
        let uomParam = {
            _id: { "$regex": 'uomInfo' },
            Barcode: { "$regex": regExp }
        };
        return findProductUom(uomParam).then(uomlist => {
            let procode = [];
            if (uomlist) {
                uomlist.forEach(uom => {
                    procode.push(uom.ProductCode);
                })
            }
            var propar = { ProductCode: { $in: procode } };
            param.$or.push(propar);
            return Promise.all([
                findProductCount(param),
                findLimitProductInfo(param, query.CurPage, query.PageSize)

            ]).then(function ([proCount, results]) {
                results.forEach(pro => {
                    pro.UomLevel = 0;
                    uomlist.forEach(uom => {
                        if (uom.ProductCode === pro.ProductCode) {
                            pro.UomLevel = uom.UomLevel;
                        }
                    })
                })
                results = results as ProductModel[];
                var result = {
                    List: results,
                    TotalRows: proCount
                }
                
                return result;
            })
        })

    }
    selectPrintTemplat() {
        return findPrintTemplat({ _id: { $gte: null, "$regex": 'printTemplat' } }).then(results => {
            return results as PrintTemplateModel[];
        })
    }

    selectOrder(query: orderQuery) {
        var BillId = new RegExp('.*' + query.BillId + '.*', 'i');
        var DealerOrgName = new RegExp('.*' + query.DealerOrgName + '.*', 'i');
        var OwnerName = new RegExp('.*' + query.OwnerName + '.*', 'i');
        var DestinationWareHouseName = new RegExp('.*' + query.DestinationWareHouseName + '.*', 'i');
        let param: any = {
            _id: {
                $gte: null, "$regex": 'orderInfo'
            }
        };
        if (query.BillId) {
            param.BillId = { "$regex": BillId };
        }
        if (query.BillType) {
            param.BillType = { $eq: query.BillType };
        }
        if (query.DealerOrgName) {
            param.DealerOrgName = { "$regex": DealerOrgName };
        }
        if (query.PayState) {
            param.PayState = { $eq: query.PayState };
        }
        if (query.AuditState) {
            param.AuditState = { $eq: query.AuditState };
        }
        if (query.ShipmentState) {
            param.ShipmentState = { $eq: query.ShipmentState };
        }
        if (query.StartTime && query.EndTime) {
            param.CreateDate = { $gte: query.StartTime, $lte: query.EndTime };
        }
        if (query.OwnerName) {
            param.OwnerName = { "$regex": OwnerName };
        }
        if (query.SourceWareHouseId) {
            param.SourceWareHouseId = { $eq: query.SourceWareHouseId };
        }
        if (query.SourceWareHouseId) {
            param.DestinationWareHouseName = { "$regex": DestinationWareHouseName };
        }
        return Promise.all([findLimitOrderInfo(param, query.CurPage, query.PageSize)])
            .then(function ([orderList]) {
                let result = {
                    List: orderList
                }
                return result;
            })

    }
    addOrders(orders: OrderModel[]) {
        return this.proSvr.addOrder(orders);
    }
}
