import { TestBed } from '@angular/core/testing';

import { SharedSongsService } from './shared-songs.service';

describe('SharedSongsService', () => {
  let service: SharedSongsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedSongsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
