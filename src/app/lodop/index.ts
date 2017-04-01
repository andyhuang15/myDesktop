export {orderInfo, tableHead, templateInfo, printSetting} from './print-tpl/model';
import {orderInfo, tableHead, templateInfo, printSetting} from './print-tpl/model';
import { Injectable } from '@angular/core';
import {EvBusService} from '../shared/service/ev-bus.service';
interface LODOP{
  PRINT_INIT (param:string):boolean,
  ADD_PRINT_TABLE(p1:string, p2:string, p3:string, p4:string, tableHtml:string):any,
  NEWPAGEA():any,
  PRINT():any
}
interface getCLodop {
  ():LODOP
}
let url = 'http://192.168.0.53:8000/';
declare var LODOP: LODOP;
declare var On_CLodop_Opened: any;
declare var getCLodop:getCLodop;
export class Lodop {
  private static instance: any;
  constructor() {
  }
  private static loadLodop() {
    return new Promise((resolve, reject) => {
      let script = document.createElement('script');
      script.src = `${url}CLodopfuncs.js`;
      document.body.appendChild(script);
      script.onload = function () {
        Lodop.instance = getCLodop() as LODOP;
        resolve(Lodop.instance);
      };
      script.onerror = function () {
        reject("脚本加载失败");
      };
    });
  }
  static getLodop():Promise<LODOP> {
    if (Lodop.instance) {
      return Promise.resolve(Lodop.instance);
    }
    return Lodop.loadLodop();
  }
}
@Injectable()
export class PrintService {
  constructor (private evBus:EvBusService) {
    // super();
  }
  sendOrderInfos (orderInfos:orderInfo[]) {
    this.evBus.$emit('print',orderInfos);
  }
  print () {
    setTimeout(_ => {

      let oContainer = document.getElementById('printTpl');
      debugger;
      let nodeList = oContainer.getElementsByClassName('print-item') as NodeList;
      Lodop.getLodop().then(lodop => {
        try {
          let a = lodop.PRINT_INIT("分销");
          if (a) {
            return lodop;
          } else {
            return null;
          }
        } catch (err) {
          console.log(err);
          return;
        }
      }).then(lodop => {
        if (!lodop) {
          return;
        }
        Array.prototype.forEach.call(nodeList, (table) => {
          table as HTMLTableElement;
          debugger;
          lodop.ADD_PRINT_TABLE('3mm', '2mm', "RightMargin:2mm", "BottomMargin:1mm", table.innerHTML);
          lodop.NEWPAGEA();
        })
        lodop.PRINT();
      });
    })
  }
}
