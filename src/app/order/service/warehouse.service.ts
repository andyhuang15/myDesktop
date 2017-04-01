import { Injectable } from '@angular/core';
import {YbHttpService} from '../../shared/index';
import {LocalDataService, WareHouseModel} from '../../db/index';
@Injectable()
export class WarehouseService {

  constructor(
      private ybhttp:YbHttpService,
      private localData:LocalDataService
  ) { }
  getDefaultWareHouse ():Promise<WareHouseModel> {
    return new Promise((resolve, rej) => {
      let data = this.localData.getDefaultWareHouse();
      if (data) {
        return resolve(data);
      }
      this.ybhttp.get('StoreManager/GetDefaultWarehouse')
        .then(
          (res:any) => {
            let result = res as WareHouseModel;
            this.localData.setDefaultWareHouse(result);
            resolve(result);
          },
          err => rej(err)
        )
    });
  }
}
