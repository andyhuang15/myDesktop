import { Injectable } from '@angular/core';
import {YbHttpService, respData} from '../../shared/yb-http.service';
import {ProModel} from '../model/pro-model';
interface proQuery {
  Fullname?:string
  ProductClass?:string
  MarketingDealerOrgId?:string
  WarehouseId?:string
  CurPage?:number
  PageSize?:number
}
@Injectable()
export class ProductSvrService {

  constructor(private ybHttp:YbHttpService) { }
  getPro (query:proQuery):Promise<ProModel[]> {
    let defaultQuery:proQuery = {
        Fullname:'',
        ProductClass:'',
        MarketingDealerOrgId:'',
        WarehouseId:'',
        CurPage:1,
        PageSize:10
    }
    let param = Object.assign({},defaultQuery, query);
    return this.ybHttp.get('Product/GetShelvesSkuList',param)
      .then((res: any) => {
        return res.List as ProModel[];
      });
  }

}
