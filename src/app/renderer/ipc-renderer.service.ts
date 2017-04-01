import { Injectable } from '@angular/core';
declare let electron: any;
declare let require: any;
@Injectable()
export class IpcRendererService {
  private static ipcRenderer:any;
  constructor() {
    if (require) {
      IpcRendererService.ipcRenderer = electron.ipcRenderer;
    }
  }
  on (message:string, done:Function) {
    return IpcRendererService.ipcRenderer.on(message, done);
  }
  send (message: string, ...args) {
    return IpcRendererService.ipcRenderer.send(message, args);
  }
  sendSync (message: string, ...args) {
    return IpcRendererService.ipcRenderer.sendSync(message, args);
  }
}
