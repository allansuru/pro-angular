import { TestBed, inject } from '@angular/core/testing';

import { Food.ServiceService } from './food.service.service';

describe('Food.ServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Food.ServiceService]
    });
  });

  it('should be created', inject([Food.ServiceService], (service: Food.ServiceService) => {
    expect(service).toBeTruthy();
  }));
});
