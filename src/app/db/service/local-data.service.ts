import { Injectable } from '@angular/core';
import { WareHouseModel, UserModel } from '../model/index';
export class LocalData {
  private readonly WAREHOUSE_KEY:string = 'DefaultWareHouse';
  private readonly USER_KEY:string = 'User';
  constructor() { }
  saveToLocalStorage (key:string, value:any) {
    if( value instanceof Object || value instanceof Array) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }
  getFormLocalStorage (key:string):any {
    var result = localStorage.getItem(key);
    if (result && typeof result !== 'undefined') {
      return JSON.parse(localStorage.getItem(key));
    }
  }

  getDefaultWareHouse ():WareHouseModel {
    let result:WareHouseModel;
    result = this.getFormLocalStorage(this.WAREHOUSE_KEY) as WareHouseModel;
    return result;
  }
  setDefaultWareHouse (warehouse:WareHouseModel) {
    this.saveToLocalStorage(this.WAREHOUSE_KEY, warehouse);
  }


  setUserInfo (userInfo:UserModel) {
    this.saveToLocalStorage(this.USER_KEY, userInfo);
  }
  getUserInfo ():UserModel {
    let res:UserModel = this.getFormLocalStorage(this.USER_KEY);
    return res;
  }
}
@Injectable()
export class LocalDataService extends LocalData{
  
}
