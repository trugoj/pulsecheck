import { TestBed, inject } from '@angular/core/testing';

import { PulseServiceService } from './pulse-service.service';

describe('PulseServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PulseServiceService]
    });
  });

  it('should be created', inject([PulseServiceService], (service: PulseServiceService) => {
    expect(service).toBeTruthy();
  }));
});
