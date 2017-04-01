import { TestBed, inject } from '@angular/core/testing';

import { OrderAdapterService } from './order-adapter.service';

describe('OrderAdapterService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OrderAdapterService]
    });
  });

  it('should ...', inject([OrderAdapterService], (service: OrderAdapterService) => {
    expect(service).toBeTruthy();
  }));
});
