import { Injectable, Injector } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, pipe } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class HttpResponseInterceptorService implements HttpInterceptor {
  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const router = this.injector.get(Router);
    return next.handle(req).pipe(
      tap((event: HttpEvent<any>) => {}, (error: any) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          router.navigate(['/login']);
        }
      })
    );
  }
}
