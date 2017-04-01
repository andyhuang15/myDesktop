import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from './login.component';
import {LoginManagerService} from './login-manager.service';
import { MaterialModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import {RendererModule} from '../renderer/renderer.module';
import {DbSvrModule} from '../db/index';
// import {IpcRendererService} from '../renderer/ipc-renderer.service';
@NgModule(
  {
     imports: [
        CommonModule,
        MaterialModule,
        FormsModule,
        RendererModule,
        DbSvrModule
     ],
    declarations: [LoginComponent],
    providers: [LoginManagerService],
    exports: [LoginComponent]
  }
)
export class LoginModule {};
