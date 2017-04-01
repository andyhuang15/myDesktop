import { TestBed, inject } from '@angular/core/testing';

import { LocalDataService } from './local-data.service';

describe('LocalDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LocalDataService]
    });
  });

  it('should ...', inject([LocalDataService], (service: LocalDataService) => {
    expect(service).toBeTruthy();
  }));
});
