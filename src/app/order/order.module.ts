import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';
import {DbSvrModule} from '../db/db-svr.module';

import {OrderRouterModule} from './order.routing';
import { AddOrderComponent } from './add-order/add-order.component';
import { SettleOrderComponent } from './settle-order/settle-order.component';
import { OrderComponent } from './order/order.component';
import { ProductModalComponent } from './product-modal/product-modal.component';
import { AddOrderFooterComponent } from './add-order/add-order-footer/add-order-footer.component';
import {WarehouseService, ProductSvrService, ShopcartService, OrderService, OrderAdapterService,DealerSvrService} from './service/index';
import { DealerModalComponent } from './dealer-modal/dealer-modal.component';
import { OrderListComponent } from './order-list/order-list.component';
import  {YbDatePipe} from './pipe/yb-date.pipe'

@NgModule({
  imports: [
    CommonModule,
    OrderRouterModule,
    MaterialModule,
    SharedModule,
    FormsModule,
    DbSvrModule
  ],
  declarations: [ AddOrderComponent, SettleOrderComponent, OrderComponent, ProductModalComponent, AddOrderFooterComponent, DealerModalComponent, OrderListComponent,YbDatePipe],
  exports: [AddOrderComponent, SettleOrderComponent, OrderComponent, ProductModalComponent, AddOrderFooterComponent],
  providers:[ProductSvrService,ShopcartService, OrderService, WarehouseService, OrderAdapterService,DealerSvrService]

})
export class OrderModule { }
