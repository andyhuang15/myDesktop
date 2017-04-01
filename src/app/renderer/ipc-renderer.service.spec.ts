import { TestBed, inject } from '@angular/core/testing';

import { IpcRendererService } from './ipc-renderer.service';

describe('IpcRendererService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IpcRendererService]
    });
  });

  it('should ...', inject([IpcRendererService], (service: IpcRendererService) => {
    expect(service).toBeTruthy();
  }));
});
