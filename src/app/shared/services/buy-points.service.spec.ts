import { TestBed } from '@angular/core/testing';

import { BuyPointsService } from './buy-points.service';

describe('BuyPointsService', () => {
  let service: BuyPointsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BuyPointsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
