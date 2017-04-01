import { Injectable } from '@angular/core';
import {YbHttpService} from '../shared/yb-http.service';
import {UserModel} from '../db/index';
interface LoginQueryObj {
  LoginName:string,
  Password: string
}
@Injectable()
export class LoginManagerService {
  constructor(private YbHttpService:YbHttpService) { }
  login (param: LoginQueryObj):Promise<UserModel> {
    return this.YbHttpService.post('Account/CheckLogin', param)
        .then(data => data);
      ;
  }
}
