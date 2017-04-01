import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductSvrService, LocalDataService} from './service/index';
import {OutProduct} from './controller/syscController';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [ProductSvrService,OutProduct, LocalDataService]
})
export class DbSvrModule {
}
