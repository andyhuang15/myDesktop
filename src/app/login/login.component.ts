import { Component, OnInit } from '@angular/core';
//import {LoginManagerService} from './login-manager.service';
import {Router} from '@angular/router';
import {LoginManagerService} from './login-manager.service';
import {IpcRendererService} from '../renderer/ipc-renderer.service';
import {OutProduct,LocalDataService} from '../db/index';
import {EvBusService} from '../shared/index';

@Component(
  {
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
  }

)
export class LoginComponent implements OnInit {
  private Password: string;
  private LoginName: string;
  constructor(
      private LoginManagerService: LoginManagerService,
      private router: Router,
      private localSvr: LocalDataService,
      // private renderer:IpcRendererService,
      private dbSvr:OutProduct,
      private evBus:EvBusService
      ) { }

  ngOnInit() {

  }
  private login ():void {
    // this.evBus.$emit('showLoading');

    this.LoginManagerService.login({LoginName: this.LoginName, Password: this.Password})
        .then(
          res => {
            debugger;
            this.localSvr.setUserInfo(res);
            return res
          },
          err => err
        ).then(res => {
          return this.dbSvr.upDate().then(
            res => {
              this.router.navigate(['order/addOrder']);
              // this.evBus.$emit('hideLoading');
            },
            err => err
          );
        })
      ;
  }
}
