import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let richiesta = request.clone({
      headers: request.headers.append(
        'Authorization',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGUzMWU3MDFmMTc1YzAwMTRjNTU4ZGEiLCJpYXQiOjE2OTI2MDYwNjQsImV4cCI6MTY5MzgxNTY2NH0.UZ9ashWA8t7I8w9cDQnlF_Q8W5q1WbF6j-hpn-BsszU'
      ),
    });
    return next.handle(richiesta);
  }
}
