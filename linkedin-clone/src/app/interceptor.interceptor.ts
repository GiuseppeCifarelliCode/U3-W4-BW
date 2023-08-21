import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {
  constructor() {}
  password: string = environment.apiKey;

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let richiesta = request.clone({
      headers: request.headers.append('Authorization', this.password),
    });
    return next.handle(richiesta);
  }
}
