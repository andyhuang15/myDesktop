import { Component  } from '@angular/core';
import  {OutProduct} from './db/index';
import {EvBusService} from './shared/index';
import { ActivatedRoute, Params,Route }   from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private isLoadingShow:boolean = false;
  private OrderInfo:any[] = [];
  constructor (private dbSvr:OutProduct, private evbus:EvBusService) {
    // this.route.
    this.evbus.$on('showLoading', () => {
      this.isLoadingShow = true;
    });
    this.evbus.$on('hideLoading', () => this.isLoadingShow = false);
    this.evbus.$on('print', (orderInfo) => {
      this.OrderInfo = orderInfo;
    });
  }

}
