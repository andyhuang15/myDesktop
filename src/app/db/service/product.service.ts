import { Injectable } from '@angular/core';
import { YbHttpService, respData } from '../../shared/yb-http.service';
import { ProductModel, ProductUomModels } from '../model/ProductModel';
import { OrderModel } from '../model/OrderModel';
import { PrintTemplateModel } from '../model/PrintTemplateModel'
import { bulkOrders, InsertOrderDocs, bulkProducts, selectUpdateDate, bulkPrintTemplats } from '../db';
interface proQuery {
  Fullname?: string,
  ProductClass?: string,
  MarketingDealerOrgId?: string,
  WarehouseId?: string,
  UpdateDate?: string,
  CurPage?: number,
  PageSize?: number
}

interface orderQuery {
  StartTime?: string,
  EndTime?: string,
  CurPage?: number,
  PageSize?: number
}
interface templatQuery {
  curPage?: number,
  pageSize?: number
}
interface dbResult {
  id: string,
  ok: boolean,
  rev: string
}
@Injectable()
export class ProductSvrService {

  constructor(private ybHttp: YbHttpService) { }
  getPro(query: proQuery) {
    let defaultQuery: proQuery = {
      Fullname: '',
      ProductClass: '',
      MarketingDealerOrgId: '',
      WarehouseId: '',
      UpdateDate: '',
      CurPage: 1,
      PageSize: 0
    }
    return selectUpdateDate().then(update => {
      if (update) {
        query.UpdateDate = update;
      }
      let param = Object.assign({}, defaultQuery, query);
      return this.ybHttp.get('Product/AllProductSkuList', param)
        .then((res: any) => {
          console.log(res);
          let result: ProductModel[] = res.List;
          if (!result) {
            return result;
          }
          let uomList: any[] = [];
          result.forEach(pro => {
            pro._id = "productInfo" + pro.ProductCode;
            if (pro.ProductSubCode) {
              pro._id = pro._id + pro.ProductSubCode;
            }
            uomList = uomList.concat(pro.UomList);
          });

          bulkProducts(result, res.UpdateTime, uomList);
          return result;
        });
    });
  }

  getOrder(query: orderQuery): Promise<OrderModel[]> {
    var now = new Date();
    var date = new Date(now.getTime() - 7 * 24 * 3600 * 1000);
    let defaultQuery: orderQuery = {
      StartTime: this.getdateTime(date),
      EndTime: this.getdateTime(now),
      PageSize: 0,
      CurPage: 1
    }

    let param = Object.assign({}, defaultQuery, query);
    return this.ybHttp.get('Order/AllOrderListForPC', param)
      .then((res: any) => {
        console.log(res);

        let result: OrderModel[] = res.data;
        if (!result) {
          return result;
        }
        result.forEach(order => {
          order._id = "orderInfo" + order.BillId;

        });

        bulkOrders(result, query.StartTime, query.EndTime);
        return result;
      });
  }
  addOrder(orders: OrderModel[]): Promise<Array<dbResult>> {
    return InsertOrderDocs(orders);
  }
  getPrintTemplate(query: templatQuery): Promise<PrintTemplateModel[]> {
    let defaultQuery: templatQuery = {
      curPage: 1,
      pageSize: 0
    }
    let param = Object.assign({}, defaultQuery, query);
    return this.ybHttp.get('PrintTemplate/GetPrintTemplateList', param)
      .then((res: any) => {
        let result: PrintTemplateModel[] = res.data;
        if (!result) {
          return result;
        }
        result.forEach(templat => {
          templat._id = "printTemplat" + templat.Id;
        })
        bulkPrintTemplats(result);
        return result;
      });
  }
  private getdateTime(date: any): any {
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var day = date.getDate();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var second = date.getSeconds();
    return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second;
  }

}
