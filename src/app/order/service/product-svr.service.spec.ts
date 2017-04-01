import { TestBed, inject } from '@angular/core/testing';

import { ProductSvrService } from './product-svr.service';

describe('ProductSvrService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductSvrService]
    });
  });

  it('should ...', inject([ProductSvrService], (service: ProductSvrService) => {
    expect(service).toBeTruthy();
  }));
});
