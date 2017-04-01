import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';

import {OrderComponent} from './order/order.component';
import {AddOrderComponent} from './add-order/add-order.component';
import {SettleOrderComponent} from './settle-order/settle-order.component';
import {OrderListComponent} from './order-list/order-list.component';
const orderRoutes:Routes = [
  {
      path: 'order',
      component: OrderComponent,
      children: [
          {
              path: '',
              redirectTo: 'addOrder',
              pathMatch: 'full'
          },
          {
              path: 'addOrder',
              component: AddOrderComponent
          },
          {
              path: 'orderList',
              component: OrderListComponent
          },
          {
              path: 'settleOrder',
              component: SettleOrderComponent
          }
      ]
  }
];
@NgModule({
  imports: [RouterModule.forChild(orderRoutes)],
  exports: [RouterModule]
})
export  class OrderRouterModule {}
