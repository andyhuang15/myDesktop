import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {IpcRendererService} from './ipc-renderer.service';
@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [],
  providers: [IpcRendererService]
})
export class RendererModule { }
