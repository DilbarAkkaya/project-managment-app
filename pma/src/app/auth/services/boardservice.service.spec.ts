import { TestBed } from '@angular/core/testing';

import { BoardserviceService } from './boardservice.service';

describe('BoardserviceService', () => {
  let service: BoardserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BoardserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
