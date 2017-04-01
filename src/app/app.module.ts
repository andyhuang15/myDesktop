import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import { MaterialModule, MdMenu} from '@angular/material';
import {SharedModule, EvBusService} from './shared/index';
import {LoginModule} from './login/login.module';
import {OrderModule} from './order/order.module';
import { AppComponent } from './app.component';
import {AppRouterModule} from './app.routing';
import {SettingModule} from './setting/setting.module';
import  {OutProduct, DbSvrModule} from './db/index';
import {PrintService} from './lodop/index';
import 'hammerjs';
import { PrintTplComponent } from './lodop/print-tpl/print-tpl.component';

@NgModule({
  declarations: [
    AppComponent,
    PrintTplComponent
   // MdMenu,
   // LoadingComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    SharedModule,
    DbSvrModule,
    LoginModule,
    OrderModule,
    AppRouterModule,
    SettingModule
  ],
  providers: [EvBusService, PrintService],
  bootstrap: [AppComponent]
})
export class AppModule { }
