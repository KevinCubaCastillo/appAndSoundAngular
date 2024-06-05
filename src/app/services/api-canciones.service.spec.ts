import { TestBed } from '@angular/core/testing';

import { ApiCancionesService } from './api-canciones.service';

describe('ApiCancionesService', () => {
  let service: ApiCancionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiCancionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
