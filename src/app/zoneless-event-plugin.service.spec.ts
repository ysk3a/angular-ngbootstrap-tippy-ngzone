import { TestBed } from '@angular/core/testing';

import { ZonelessEventPluginService } from './zoneless-event-plugin.service';

describe('ZonelessEventPluginService', () => {
  let service: ZonelessEventPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZonelessEventPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
