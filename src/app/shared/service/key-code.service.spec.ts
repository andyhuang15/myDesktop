import { TestBed, inject } from '@angular/core/testing';

import { KeyCodeService } from './key-code.service';

describe('KeyCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [KeyCodeService]
    });
  });

  it('should ...', inject([KeyCodeService], (service: KeyCodeService) => {
    expect(service).toBeTruthy();
  }));
});
