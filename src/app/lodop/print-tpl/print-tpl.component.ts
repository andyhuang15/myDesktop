//OrderInfo [订单详情]
//templateInfo.setFontSize
//templateInfo.headMsg  头部内容
//templateInfo.FixedLine 空数组
//templateInfo.IsNote
//templateInfo.footMsg
//tableHead []表格头部数组
//PrintContent [{Key: "CreatDate", Value: "制单时间"},{Key: "DealerOrgName", Value: "客户"}]
import {orderInfo, tableHead, templateInfo, printSetting} from './model';
import { Component, OnInit, Input } from '@angular/core';
declare var unescape: any;
// interface printSetting
const PrintData = {
  SaleOrder: {
    Name: "销售单",
    Type: "SaleOrder",
    Interface: "Order/Print",
    TemplateUrl: "view/print/table.html",
    TableHead: [
      {
        Name: "序号",
        DisplayName: "序号",
        Width: "200px",
        IsShow: true,
        TdData: "OrderProduct.SeqNo",
        textStyle: "center"
      },
      {
        Name: "商品条码",
        DisplayName: "商品条码",
        Width: "400px",
        IsShow: true,
        TdData: "OrderProduct.Barcode",
        textStyle: "center"
      },
      {
        Name: "商品名称",
        DisplayName: "商品名称",
        Width: "1500px",
        IsShow: true,
        TdData: "OrderProduct.SupplierProductName",
        textStyle: "left"
      },
      {
        Name: "规格",
        DisplayName: "规格",
        Width: "400px",
        IsShow: true,
        TdData: "OrderProduct.Specification",
        textStyle: "center"
      },
      {
        Name: "单位",
        DisplayName: "单位",
        Width: "400px",
        IsShow: true,
        TdData: "OrderProduct.Uom",
        textStyle: "center"
      },
      {
        Name: "数量",
        DisplayName: "数量",
        Width: "400px",
        IsShow: true,
        TdData: "OrderProduct.AllQty",
        textStyle: "center"
      },
      {
        Name: "单价",
        DisplayName: "单价",
        Width: "400px",
        IsShow: true,
        TdData: "OrderProduct.Price",
        textStyle: "center"
      },
      {
        Name: "金额",
        DisplayName: "金额",
        Width: "400px",
        IsShow: true,
        TdData: "OrderProduct.SettlementTotalValue",
        textStyle: "center"
      },
      {
        Name: "备注",
        DisplayName: "备注",
        Width: "500px",
        IsShow: false,
        TdData: "",
        textStyle: "left"
      }
    ]
  }
}
@Component({
  selector: 'app-print-tpl',
  templateUrl: './print-tpl.component.html',
  styleUrls: ['./print-tpl.component.scss']
})
export class PrintTplComponent implements OnInit {
  @Input() currentType: string = "SaleOrder";
  private templateInfo: templateInfo = {
    footMsg: '联系人:张三',
    headMsg: '销售单',
    setFontSize: 18,
    IsNote: false,
    FixedLine: []
  };
  private tableHead = PrintData.SaleOrder.TableHead;
  @Input() OrderInfo:orderInfo[] = [];
  private currentPrintSetting: printSetting = PrintData[this.currentType];
  constructor() { }
  ngOnInit() {
    this.currentPrintSetting = PrintData[this.currentType];
  }
}
