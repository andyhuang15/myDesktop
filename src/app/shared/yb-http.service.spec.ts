import { TestBed, inject } from '@angular/core/testing';

import { YbHttpService } from './yb-http.service';

describe('YbHttpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [YbHttpService]
    });
  });

  it('should ...', inject([YbHttpService], (service: YbHttpService) => {
    expect(service).toBeTruthy();
  }));
});
