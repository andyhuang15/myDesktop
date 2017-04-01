import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {YbHttpService} from './yb-http.service';
import {EvBusService} from './service/ev-bus.service';
import {KeyCodeService} from './service/key-code.service';
import { ModalComponent } from './modal/modal.component';
import { LoadingComponent } from './component/loading/loading.component';
import { FocusByIdDirective } from './directive/focus-by-id.directive';

import { KeycodeListenDirective } from './directive/keycode-listen.directive';
import { BackBtnDirective } from './directive/back-btn.directive';
import { PageNavComponent } from './component/page-nav/page-nav.component';
import { AutoSelectDirective } from './directive/auto-select.directive';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ModalComponent, LoadingComponent, FocusByIdDirective, KeycodeListenDirective, BackBtnDirective, PageNavComponent, AutoSelectDirective],
  providers:[YbHttpService, EvBusService, KeyCodeService],
  exports: [ModalComponent, LoadingComponent, FocusByIdDirective, KeycodeListenDirective, BackBtnDirective,PageNavComponent, AutoSelectDirective]
})
export class SharedModule { }
