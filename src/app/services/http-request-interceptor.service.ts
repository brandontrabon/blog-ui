import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SessionService } from './session.service';

@Injectable()
export class HttpRequestInterceptorService implements HttpInterceptor {
  constructor(private sessionService: SessionService) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.sessionService.token != null) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${this.sessionService.token}`
        }
      });
    }

    return next.handle(req);
  }
}
