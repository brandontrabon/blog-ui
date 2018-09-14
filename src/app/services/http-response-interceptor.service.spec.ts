import { TestBed, inject } from '@angular/core/testing';

import { HttpResponseInterceptorService } from './http-response-interceptor.service';

describe('HttpResponseInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpResponseInterceptorService]
    });
  });

  it('should be created', inject([HttpResponseInterceptorService], (service: HttpResponseInterceptorService) => {
    expect(service).toBeTruthy();
  }));
});
