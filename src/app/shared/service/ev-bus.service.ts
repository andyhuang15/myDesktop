import { Injectable } from '@angular/core';

@Injectable()
export class EvBusService {
  private static events = {};
  constructor() { }
    $on (type:string, callBack:Function) {
      if (EvBusService.events[type]) {
        EvBusService.events[type].push(callBack);
        return;
      }
      EvBusService.events[type] = [callBack];
    }
    $emit (type:string, ...args) {
      if (EvBusService.events[type]) {
        EvBusService.events[type].forEach(function (callBack, idx) {
          callBack(...args);
        })
      }
    }
    $remove (type:string, callBack:Function) {
      if (!callBack) {
        EvBusService.events[type] = [];
        return;
      }
      for (let i = 0; i < EvBusService.events[type].length; i++) {
        if (EvBusService.events[type][i] === callBack) {
          EvBusService.events[type].splice(i, 1);
        }
      }
    }
}

