import { Component, OnInit, OnDestroy } from '@angular/core';
import { AddOrderFooterComponent } from './add-order-footer/add-order-footer.component';
import { ProModel as ProModelForSubmit, UomModel } from '../model/pro-model';
import { Router } from '@angular/router';
import { MdSnackBar } from '@angular/material';
import { ShopcartService } from '../service/shopcart.service';
import { WarehouseService } from '../service/index';
import { OutProduct, WareHouseModel, LocalDataService } from '../../db/index';
import { EvBusService, Vectors } from '../../shared/index';
import { DealerModel, HistoryPriceModel } from '../model/dealer-model';
import { DealerSvrService } from '../service/dealer-svr.service';
interface ProModel extends ProModelForSubmit {
  UomLevel?: number,
  UomList: UomModel[],
  curUomIndex?: number
}

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.scss']
})

export class AddOrderComponent implements OnInit, OnDestroy {
  private vector: Vectors<any> = new Vectors();
  private vectorList: any[] = [];
  private products: ProModel[] = [];
  private dealerInfo: DealerModel;
  private searchResultsOfPro: ProModel[] = [];
  private searchResultsOfDealer: DealerModel[] = [];
  private isShow: boolean = false;
  private dealerShow: boolean = false;
  private searchQuery: string = '';
  private dealerQuery: string = '';
  private TotalValue: number = 0;
  private defaultWareHouse: WareHouseModel;
  private cursorIndex = 0;
  private totalNum = 0;
  private userName = '';
  private curDealer = '';
  constructor(
    private route: Router,
    private toast: MdSnackBar,
    private shopcart: ShopcartService,
    private warehouseSvr: WarehouseService,
    private localSvr: LocalDataService,
    private evbus: EvBusService,
    private OutProduct: OutProduct,
    private dealerSvr: DealerSvrService,
  ) { }
  // 生命周期钩子
  ngOnInit() {
    this.update();
    this.userName = this.localSvr.getUserInfo().UserName;
    this.warehouseSvr.getDefaultWareHouse()
      .then(res => this.defaultWareHouse = res);
    this.focusProsearchInput();
  }
  ngOnDestroy() {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.

  }

  // 业务代码
  update() {
    this.vectorList = this.vector.getAllList();
    this.products = this.vector.toArray();
  }
  toogleModal() {
    this.isShow = true;
  }
  focusProsearchInput() {
    let self = this;
    setTimeout(_ => {
      self.evbus.$emit('focusById', 'proSearch');
    });
  }
  onDealerQueryChange(querystr: string) {
    this.dealerQuery = querystr;
if (!querystr) {
      return;
    }
    this.searchDealer(querystr).then(list => {
     this.dealerQuery = '';
      let len = list.length;
      if (!len) {
        this.toast.open('未找到相关客户', '确定', { duration: 2000 });
        return;
      }
      if (len === 1) {
        this.onDealerSelected(list[0]);
        return;
      }
      this.dealerShow = true;
    })
  }
  searchDealer(dealerName: string): Promise<DealerModel[]> {
    return this.dealerSvr.getDealer({ DealerName: dealerName }).then(res => {
      this.searchResultsOfDealer = res;
      return res;
    })
  }

  onDealerSelected(dealer: DealerModel) {
    let proCode: string[] = [];
    this.curDealer = dealer.DealerRemarkName;
    if (this.products.length <= 0) {
      return;
    }
    this.products.forEach(pro => {
      proCode.push(pro.ProductCode);
    })
    this.dealerInfo = dealer;
    this.dealerSvr.getDealerHistoryPrice({ ProductCodeList: proCode, DealerId: dealer.DealerOrgId }).then(res => {
      //res = res as HistoryPriceModel[];
      this.vectorList.forEach(pro => {
        res.forEach(resPro => {
          if (pro.ProductCode == resPro.ProductCode) {
            this.GetUomPrice(pro, resPro);
          }
        });
      });
    });
  }

  private GetUomPrice(pro: ProModel, resPro: HistoryPriceModel): void {
    //let uom = pro.UomList.find(abc => abc.UomLevel === pro.UomLevel);
    pro.UomList.forEach(uom => {
      resPro.UomModels.forEach(resUom => {
        if (uom.UomCode === resUom.UomCode) {
          uom.SettlementPrice = resUom.UomPrice;
        }
      })

    });
    this.qtyChange(pro);
  }

  onProQueryChange(querystr: string) {
    if (!querystr) {
      return;
    }
    this.searchQuery = querystr;

    this.searchPro(this.searchQuery).then(list => {
      this.searchQuery = '';
      let len = list.length;
      if (!len) {
        this.toast.open('未找到相关商品', '确定', { duration: 2000 });
        return;
      }
      if (len === 1) {
        this.onProSelected(list[0]);
        return;
      }
      this.isShow = true;
    });
  }
  initPro(pro: ProModel) {
    // pro.UomLevel = 0;
    pro.curUomIndex = 0;
    pro.UomList.forEach((uom, index) => {
      uom.Quantity = pro.UomLevel === uom.UomLevel ? 1 : 0;
      if (pro.UomLevel === uom.UomLevel)
        pro.curUomIndex = index;
      uom.SettlementPrice = uom.SettlementPrice > 0 ? uom.SettlementPrice : uom.UomPrice;
    });
    pro.Amount = this.getProAmout(pro);
    return pro;
  }
  searchPro(querystr: string): Promise<ProModel[]> {
    return this.OutProduct.selectProduct({ KeyWord: querystr })
      .then(res => {
        console.log(res.List);
        res.List as ProModel[];
        this.searchResultsOfPro = res.List.map(pro => this.initPro(pro));
        return this.searchResultsOfPro;
      });
  }
  getProAmout(pro: ProModel) {
    let sum = 0;
    pro.UomList.forEach(uom => sum += uom.Quantity * uom.SettlementPrice);
    return sum;
  }
  proCountInc(index: number) {
    this.vectorList[index].UomList[this.vectorList[index].UomLevel].Quantity++;
    this.cursorIndex = index;
    this.calcProAmount(index);
  }
  calcProAmount(index: number) {
    this.vectorList[index].Amount = 0;
    this.vectorList[index].UomList.forEach(uom => {
      this.vectorList[index].Amount += uom.SettlementPrice * uom.Quantity;
    });
  }
  vectorPushPro(pro) {
    let proForSubmit = this.initPro(pro);
    // this.vectorList.push(proForSubmit);
    this.vector.push(proForSubmit)
    this.update();
    this.cursorIndex = this.products.length - 1;
  }
  onProSelected(pro: ProModel) {
    if (this.dealerInfo) {
      this.dealerSvr.getDealerHistoryPrice({ ProductCodeList: [pro.ProductCode], DealerId: this.dealerInfo.DealerOrgId }).then(res => {
        if (res && res.length > 0) {
          this.GetUomPrice(pro, res[0]);
        }
      });
    }
    this.focusProsearchInput();
    var index = this.IndexOfProInProducts(pro);
    if (index >= 0) {
      this.proCountInc(index);
    } else {
      this.vectorPushPro(pro);
      index = 0;
    }
    this.getTotal();
  }
  IndexOfProInProducts(pro: ProModel): number {
    let proArr = this.products;
    for (let i = 0; i < proArr.length; i++) {
      let CurUomCode = proArr[i].UomList[proArr[i].UomLevel].UomCode;
      if (`${proArr[i].ProductCode}${CurUomCode}` ===
        `${pro.ProductCode}${pro.UomList[pro.UomLevel].UomCode}`) {
        return i;
      }
    }
    return -1;
  }
  qtyChange(pro: ProModel) {
    pro.Amount = this.getProAmout(pro);
    let total = this.getTotal();
  }
  getTotal(): { total: number, totalNum: number } {
    let total = 0;
    let totalNum = 0;
    this.products.forEach((pro: ProModel) => {
      total += pro.Amount;
      pro.UomList.forEach(uom => {
        totalNum += uom.Quantity;
      });
    });
    this.TotalValue = total
    this.totalNum = totalNum;
    return { total, totalNum };
  }
  UpdateLocalProduct() {
    this.OutProduct.upDate().then(result => {
      if (result) {
        this.toast.open('操作成功', '确定', {
          duration: 2000,
        });
      }
    });
  }
  addOrder() {
    if (this.products.length === 0) {
      this.toast.open('请选择至少一个商品', '确定', {
        duration: 2000,
      });
      return;
    }
    this.shopcart.saveList(this.products, this.dealerInfo);
    this.route.navigate(['order/settleOrder']);
  }
  choseUom(pro: ProModel, index: number) {
    pro.UomList.forEach((item, curIndex) => item.Quantity = curIndex === index ? 1 : 0);
    pro.curUomIndex = index;
    this.qtyChange(pro);
  }
  onArrowLeft() {
    let curPro = this.vectorList[this.cursorIndex];
    curPro.UomList[curPro.curUomIndex].Quantity = Math.max(1, --curPro.UomList[curPro.UomLevel].Quantity);
    this.qtyChange(curPro);
  }
  onArrowRight() {
    let curPro = this.vectorList[this.cursorIndex];
    curPro.UomList[curPro.curUomIndex].Quantity++;
    this.qtyChange(curPro);
  }
  onArrowDown() {
    this.cursorIndex++;
    this.cursorIndex = Math.min(this.products.length - 1, this.cursorIndex);
  }
  onArrowUp() {
    this.cursorIndex--;
    this.cursorIndex = Math.max(0, this.cursorIndex);
  }
  deletePro() {
    this.vector.del(this.cursorIndex);
    this.update();
    this.getTotal();
    this.onArrowUp();
  }
}
