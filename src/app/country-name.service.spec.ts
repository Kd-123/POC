import { TestBed } from '@angular/core/testing';

import { CountryNameService } from './country-name.service';

describe('CountryNameService', () => {
  let service: CountryNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
