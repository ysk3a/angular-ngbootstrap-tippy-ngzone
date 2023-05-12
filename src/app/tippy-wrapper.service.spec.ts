import { TestBed } from '@angular/core/testing';

import { TippyWrapperService } from './tippy-wrapper.service';

describe('TippyWrapperService', () => {
  let service: TippyWrapperService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TippyWrapperService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
