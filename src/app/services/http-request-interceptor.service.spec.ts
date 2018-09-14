import { TestBed, inject } from '@angular/core/testing';

import { HttpInterceptorRequestService } from './http-interceptor-request.service';

describe('HttpRequestInterceptorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpInterceptorRequestService]
    });
  });

  it('should be created', inject([HttpInterceptorRequestService], (service: HttpInterceptorRequestService) => {
    expect(service).toBeTruthy();
  }));
});
