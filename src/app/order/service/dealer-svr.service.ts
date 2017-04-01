import { Injectable } from '@angular/core';
import { YbHttpService, respData } from '../../shared/yb-http.service';
import { DealerModel, HistoryPriceModel } from '../model/dealer-model';
interface dealerQuery {
    DealerName?: string,
    FirstChineseChar?: string,
    CurPage?: number,
    PageSize?: number
}
interface priceQuery {
    ProductCodeList?: string[],
    DealerId?: string
}
@Injectable()
export class DealerSvrService {

    constructor(private ybHttp: YbHttpService) { }
    getDealer(query: dealerQuery): Promise<DealerModel[]> {
        let defaultQuery: dealerQuery = {
            DealerName: '',
            FirstChineseChar: '',
            CurPage: 1,
            PageSize: 0
        }
        let param = Object.assign({}, defaultQuery, query);
        return this.ybHttp.get('Dealer/GetBoundDealerList', param)
            .then((res: any) => {
                return res.List as DealerModel[];
            });
    }

    getDealerHistoryPrice(query): Promise<HistoryPriceModel[]> {
        let defaultQuery: priceQuery = {
            ProductCodeList: [],
            DealerId: ""
        }
        let param = Object.assign({}, defaultQuery, query);
        return this.ybHttp.post('Product/GetDealerProductPrice', param)
            .then((res: any) => {
                return res as HistoryPriceModel[];
            });
    }

}
