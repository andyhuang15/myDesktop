import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import {MdSnackBar} from '@angular/material';
import {EvBusService} from './service/ev-bus.service';
import 'rxjs/add/operator/toPromise';
import {URL} from '../../webapi';
export interface respData {
  Code: number | string,
  Message: string,
  Value: any,
  Proposal?: string
};
@Injectable()
export class YbHttpService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private static timer:any;
  constructor(private http: Http, public toast: MdSnackBar, private evBus:EvBusService) { }
  post (api: string, param: Object = {}):Promise<any> {
    return new Promise((resolve, reject) => {
      this.showLoading();
      this.http.post(`${URL}${api}`,JSON.stringify(param),{headers: this.headers})
               .toPromise()
               .then(
                 response => this.successHandle(response.json() as any, resolve, reject),
                 err => this.handleError.bind(this, err, reject)
                 ).catch(
                   err => this.handleError.bind(this, err, reject)
                 );
    });
  }
  private createQueryString (param:Object):string {
    let paramStr = '?';
    if (param) {
        for (let k in param) {
          if (param.hasOwnProperty(k)) {
            paramStr += (`${k}=${param[k]}&`);
          }
        }
    }
    paramStr = paramStr.substring(0, paramStr.length - 1);
    return paramStr;
  }
  get (api:string,  param: Object = {}):Promise<any> {
    let paramStr = this.createQueryString(param);
    this.showLoading();
    return new Promise((resolve, reject) => {
      return this.http.get(`${URL}${api}\\${paramStr}`, {headers: this.headers})
            .toPromise()
            .then(
              response => this.successHandle(response.json() as any, resolve, reject),
              err => this.handleError.bind(this, err, reject)
            ).catch(err => this.handleError.bind(this, err, reject));
    });

  }
  handleError (err, reject) {
    this.toast.open('服务器错误', '确定', {
      duration: 2000,
    });
    this.hideLoading();
    reject(err);
    console.log(err);
  }
  successHandle (respData:respData, resolve, reject) {
    this.hideLoading();
    let self = this;
    if (respData.Code !== 0) {
      self.toast.open(respData.Message, '确定', {
        duration: 2000,
      });
      return reject(respData.Message);
    }

    resolve(respData.Value as any);
  }
  showLoading () {
    let self = this;
    if (YbHttpService.timer) {
      clearTimeout(YbHttpService.timer)
    }
    YbHttpService.timer = setTimeout(_ => {
        self.evBus.$emit('showLoading');
      }, 300);

  }
  hideLoading () {
    this.evBus.$emit('hideLoading');
    clearTimeout(YbHttpService.timer);
  }
}
