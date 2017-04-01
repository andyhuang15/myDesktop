import { Injectable } from '@angular/core';
import { ProModel } from '../model/pro-model';
import {DealerModel } from '../model/dealer-model';
@Injectable()
export class ShopcartService {
  private static pros: ProModel[] = [];
  private static dealeInfo: DealerModel;
  constructor() { }
  saveList (prolist:ProModel[],dealer:DealerModel) {
    ShopcartService.pros = prolist;
    ShopcartService.dealeInfo = dealer;
  }

  getList ():ProModel[] {
    return ShopcartService.pros;
  }
  getDealer(): DealerModel { 
    return ShopcartService.dealeInfo;
  }
}
